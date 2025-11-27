// DogTown front-end interacciones
(() => {
  const $ = (sel, ctx=document) => ctx.querySelector(sel);
  const $$ = (sel, ctx) => Array.from((ctx || document).querySelectorAll(sel));

  // Año en footer
  $('#year').textContent = new Date().getFullYear();

  // Menú responsive
  const navToggle = $('.nav-toggle');
  const navList = $('.nav-list');
  navToggle?.addEventListener('click', () => {
    navList.classList.toggle('open');
  });

  // Slider básico
  const slidesTrack = $('.slides');
  let slideIndex = 0;
  function updateSlider(dir){
    const slides = $$('.slide', slidesTrack);
    if (!slides.length) return;
    slideIndex = (slideIndex + dir + slides.length) % slides.length;
    slidesTrack.style.transform = `translateX(-${slideIndex*100}%)`;
    slidesTrack.style.transition = 'transform .4s ease';
  }
  $('.slide-btn.prev')?.addEventListener('click', () => updateSlider(-1));
  $('.slide-btn.next')?.addEventListener('click', () => updateSlider(1));
  if (slidesTrack) {
    setInterval(()=>updateSlider(1), 6000);
  }

  // Productos (20+) con imágenes SVG de autoría propia
  const products = Array.from({length: 20}).map((_, i) => ({
    id: `p${i+1}`,
    name: [
      'Cama acolchada','Juguete mordedero','Collar regulable','Correa anti-tirones','Shampoo hipoalergénico',
      'Snacks naturales','Plato antideslizante','Arnés cómodo','Pelota saltarina','Cepillo doble',
      'Dispensador de bolsas','Casa plegable','Toalla microfibra','Suplemento omega','Comedero elevado',
      'Kit cuidado dental','Perfume canino','Transportadora','Impermeable','Premios entrenamiento'
    ][i],
    price: (5 + i*0.8 + (i%3)*0.5).toFixed(2),
    img: `assets/images/product-${(i%8)+1}.svg`
  }));

  // Render de productos
  const grid = $('#product-grid');
  function renderProducts(){
    if (!grid) return;
    grid.innerHTML = '';
    products.forEach(p => {
      const card = document.createElement('article');
      card.className = 'product';
      card.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <div class="rating" data-id="${p.id}">
          ${[1,2,3,4,5].map(n => `<button aria-label="${n} estrellas" data-star="${n}" class="star">★</button>`).join('')}
          <span class="avg" aria-live="polite"></span>
        </div>
        <div class="price">$${p.price}</div>
        <div class="actions">
          <button class="btn" data-add="${p.id}">Añadir</button>
          <button class="btn secondary" data-buy="${p.id}">Comprar</button>
        </div>`;
      grid.appendChild(card);
      initRating(card.querySelector('.rating'));
    });
  }

  // Valoración con localStorage
  const RATE_KEY = 'dogtown_ratings';
  const ratings = JSON.parse(localStorage.getItem(RATE_KEY) || '{}');
  function saveRatings(){ localStorage.setItem(RATE_KEY, JSON.stringify(ratings)); }
  function initRating(wrapper){
    const id = wrapper?.dataset.id; if (!id) return;
    const stars = $$('button.star', wrapper);
    function paint(){
      const data = ratings[id] || {sum:0, count:0};
      const avg = data.count ? (data.sum/data.count) : 0;
      stars.forEach((s, i)=> s.classList.toggle('active', i < Math.round(avg)));
      $('.avg', wrapper).textContent = data.count ? `${avg.toFixed(1)} (${data.count})` : 'Sin votos';
    }
    stars.forEach(btn => btn.addEventListener('click', () => {
      const val = Number(btn.dataset.star);
      if (!ratings[id]) ratings[id] = {sum:0,count:0};
      ratings[id].sum += val; ratings[id].count += 1; saveRatings(); paint();
    }));
    paint();
  }

  // Carrito con localStorage
  const CART_KEY = 'dogtown_cart';
  let cart = JSON.parse(localStorage.getItem(CART_KEY) || '[]');
  function saveCart(){ localStorage.setItem(CART_KEY, JSON.stringify(cart)); }
  function addToCart(id, qty=1){
    const found = cart.find(it => it.id===id);
    if (found) found.qty += qty; else cart.push({id, qty});
    saveCart(); renderCart();
  }
  function setQty(id, qty){
    cart = cart.map(it => it.id===id? {...it, qty: Math.max(1, qty)}: it);
    saveCart(); renderCart();
  }
  function removeFromCart(id){ cart = cart.filter(it => it.id!==id); saveCart(); renderCart(); }

  grid?.addEventListener('click', (e)=>{
    const t = e.target; if (!(t instanceof HTMLElement)) return;
    const add = t.closest('[data-add]');
    const buy = t.closest('[data-buy]');
    if (add){ addToCart(add.getAttribute('data-add')); }
    if (buy){ addToCart(buy.getAttribute('data-buy')); document.getElementById('checkout').scrollIntoView({behavior:'smooth'}); }
  });

  // const cartBox = $('#cart'); // no usado, se mantiene el id para estilos
  const cartItems = $('#cart-items');
  const cartTotal = $('#cart-total');
  $('#clear-cart')?.addEventListener('click', ()=>{ cart=[]; saveCart(); renderCart(); });
  $('#checkout')?.addEventListener('click', ()=>{
    alert('Gracias por tu compra. Te contactaremos para finalizar el pedido.');
    cart=[]; saveCart(); renderCart();
  });

  function renderCart(){
    if (!cartItems) return;
    cartItems.innerHTML = '';
    let total = 0;
    cart.forEach(it => {
      const p = products.find(x => x.id===it.id);
      if (!p) return;
      const line = document.createElement('div');
      const sub = Number(p.price) * it.qty; total += sub;
      line.className = 'cart-item';
      line.innerHTML = `
        <img src="${p.img}" alt="${p.name}">
        <div>
          <div>${p.name}</div>
          <div class="qty">
            <button aria-label="menos" data-dec="${p.id}">-</button>
            <span>${it.qty}</span>
            <button aria-label="más" data-inc="${p.id}">+</button>
            <button aria-label="quitar" data-del="${p.id}">✕</button>
          </div>
        </div>
        <strong>$${sub.toFixed(2)}</strong>`;
      cartItems.appendChild(line);
    });
    if (cartTotal) cartTotal.textContent = `$${total.toFixed(2)}`;
  }

  cartItems?.addEventListener('click', (e)=>{
    const t = e.target; if (!(t instanceof HTMLElement)) return;
    const idInc = t.getAttribute('data-inc');
    const idDec = t.getAttribute('data-dec');
    const idDel = t.getAttribute('data-del');
    if (idInc){ const item = cart.find(x=>x.id===idInc); setQty(idInc, (item?.qty||1)+1); }
    if (idDec){ const item = cart.find(x=>x.id===idDec); setQty(idDec, Math.max(1,(item?.qty||1)-1)); }
    if (idDel){ removeFromCart(idDel); }
  });

  // Formulario de contacto
  const contactForm = $('#contact-form');
  contactForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nombre = $('#nombre').value.trim();
    const email = $('#email').value.trim();
    const mensaje = $('#mensaje').value.trim();
    const feedback = $('#contact-feedback');
    if (!nombre || !email || !mensaje || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){
      feedback.textContent = 'Por favor completa los campos correctamente.';
      feedback.style.color = '#b42318';
      return;
    }
    feedback.textContent = '¡Gracias! Te contactaremos pronto.';
    feedback.style.color = '#0f766e';
    contactForm.reset();
  });

  // Chat Widget simple (persistencia local)
  const CHAT_KEY = 'dogtown_chat';
  const chatToggle = $('#chat-toggle');
  const chatPanel = $('#chat-panel');
  const chatClose = $('#chat-close');
  const chatLog = $('#chat-log');
  const chatForm = $('#chat-form');
  const chatInput = $('#chat-input');
  let messages = JSON.parse(localStorage.getItem(CHAT_KEY) || '[]');
  function saveChat(){ localStorage.setItem(CHAT_KEY, JSON.stringify(messages)); }
  function renderChat(){
    if (!chatLog) return;
    chatLog.innerHTML = '';
    messages.forEach(m => {
      const row = document.createElement('div');
      row.className = `msg ${m.me? 'me':''}`;
      row.innerHTML = `<div class="bubble">${m.text}</div>`;
      chatLog.appendChild(row);
    });
    chatLog.scrollTop = chatLog.scrollHeight;
  }
  function botReply(text){
    messages.push({text, me:false}); saveChat(); renderChat();
  }
  chatToggle?.addEventListener('click', ()=>{
    const hidden = chatPanel.hasAttribute('hidden');
    if (hidden) chatPanel.removeAttribute('hidden');
    else chatPanel.setAttribute('hidden','');
    chatToggle.setAttribute('aria-expanded', String(hidden));
  });
  chatClose?.addEventListener('click', ()=>{
    chatPanel.setAttribute('hidden','');
    chatToggle.setAttribute('aria-expanded', 'false');
  });
  chatForm?.addEventListener('submit', (e)=>{
    e.preventDefault();
    const txt = chatInput.value.trim();
    if (!txt) return;
    messages.push({text: txt, me:true}); saveChat(); renderChat();
    chatInput.value='';
    setTimeout(()=> botReply('¡Gracias por escribir! Pronto un humano responderá 🐶'), 500);
  });

  // Inicializar
  renderProducts();
  renderCart();
  renderChat();
})();
