import { useEffect } from 'react'

function App() {
  // Cargar el script de interacciones una vez montado el DOM
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'module'
    script.src = 'assets/js/app.js'
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#inicio" aria-label="DogTown home">
            <img src="assets/images/hero-dog.svg" alt="DogTown" width="36" height="27" />
            <span>DogTown</span>
          </a>
          <nav className="main-nav" aria-label="Principal">
            <button className="nav-toggle" aria-expanded="false" aria-controls="menu">☰</button>
            <ul id="menu" className="nav-list">
              <li><a href="#quienes">Quiénes somos</a></li>
              <li><a href="#vision-mision">Visión &amp; Misión</a></li>
              <li><a href="#politicas">Políticas</a></li>
              <li><a href="#ubicacion">Ubicación</a></li>
              <li><a href="shop.html">Tienda</a></li>
              <li><a href="#faq">FAQ</a></li>
              <li><a href="#contacto" className="btn">Contáctame</a></li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <section className="hero container">
          <div>
            <h1>Hotel para perros con amor y cuidado</h1>
            <p>En DogTown tu peludo disfruta de hospedaje, spa, paseos y adiestramiento profesional.</p>
            <a href="shop.html" className="btn">Ver Tienda</a>
          </div>
          <div className="hero-art">
            <img src="assets/images/hero-dog.svg" alt="Ilustración perro feliz" />
          </div>
        </section>

        <section className="slider-section">
          <div className="container slider">
            <button className="slide-btn prev" aria-label="Anterior">‹</button>
            <div className="slides">
              <div className="slide">
                <img src="assets/images/slide-hotel.svg" alt="Hotel canino" />
                <h3>Hotel</h3>
              </div>
              <div className="slide">
                <img src="assets/images/slide-spa.svg" alt="Spa canino" />
                <h3>Spa</h3>
              </div>
              <div className="slide">
                <img src="assets/images/slide-paseo.svg" alt="Paseos" />
                <h3>Paseo</h3>
              </div>
              <div className="slide">
                <img src="assets/images/slide-adiestramiento.svg" alt="Adiestramiento" />
                <h3>Adiestramiento</h3>
              </div>
            </div>
            <button className="slide-btn next" aria-label="Siguiente">›</button>
          </div>
        </section>

        <section id="quienes" className="section container">
          <div className="grid-2">
            <div>
              <h2>¿Quiénes somos?</h2>
              <p>Somos un hotel y tienda para perros dedicado al bienestar, diversión y seguridad de tu mejor amigo.</p>
            </div>
            <div>
              <h2>¿Qué hacemos?</h2>
              <p>Ofrecemos hospedaje, spa, paseos diarios y adiestramiento positivo con profesionales certificados.</p>
            </div>
          </div>
        </section>

        <section id="vision-mision" className="section container">
          <div className="grid-2">
            <div>
              <h2>Visión</h2>
              <p>Ser el espacio favorito de los tutores para el cuidado integral de sus perros en la ciudad.</p>
            </div>
            <div>
              <h2>Misión</h2>
              <p>Brindar experiencias seguras, amorosas y personalizadas que mejoren la calidad de vida de cada perro.</p>
            </div>
          </div>
        </section>

        <section id="politicas" className="section container">
          <h2>Políticas de calidad</h2>
          <ul className="policies">
            <li>Protocolos de higiene y desinfección diarios.</li>
            <li>Monitoreo y comunicación continua con los tutores.</li>
            <li>Adiestramiento basado en refuerzo positivo.</li>
            <li>Alimentación y medicación según indicaciones.</li>
          </ul>
        </section>

        <section id="ubicacion" className="section container">
          <div className="grid-2">
            <div>
              <h2>Ubicación física</h2>
              <p>Calle Canina 123, Col. Peluditos, Ciudad Mascota.</p>
              <p>Horarios: L–S 9:00–19:00</p>
            </div>
            <div className="map">
              <img src="assets/images/mapa.svg" alt="Mapa DogTown" />
            </div>
          </div>
        </section>

        <section id="faq" className="section container faq">
          <h2>Preguntas frecuentes</h2>
          <details>
            <summary>¿Qué debo llevar para el hospedaje?</summary>
            <p>Trae su cartilla de vacunación, alimento y una manta u objeto familiar.</p>
          </details>
          <details>
            <summary>¿Aceptan todas las razas?</summary>
            <p>Sí, realizamos una evaluación previa para asegurar su bienestar.</p>
          </details>
          <details>
            <summary>¿Cómo funcionan los paseos?</summary>
            <p>Salimos en grupos pequeños con arnés y rutas seguras del vecindario.</p>
          </details>
        </section>

        {/* La Tienda ahora vive en una página separada: shop.html */}

        <section id="contacto" className="section container">
          <div className="grid-2">
            <div>
              <h2>Contáctame</h2>
              <p>¿Tienes dudas o quieres reservar? Escríbenos y te respondemos pronto.</p>
              <form id="contact-form" className="contact-form">
                <div className="form-row">
                  <label htmlFor="nombre">Nombre</label>
                  <input id="nombre" name="nombre" required />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" required />
                </div>
                <div className="form-row">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea id="mensaje" name="mensaje" rows={4} required></textarea>
                </div>
                <button className="btn" type="submit">Enviar</button>
                <div id="contact-feedback" className="feedback" aria-live="polite"></div>
              </form>
            </div>
            <div>
              <h3>Síguenos</h3>
              <p>Encuéntranos en redes sociales:</p>
              <div className="social">
                <a className="social-link" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
                <a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
                <a className="social-link" href="https://x.com" target="_blank" rel="noreferrer">X</a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>© <span id="year">2025</span> DogTown</div>
          <div className="social">
            <a className="social-link" href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a className="social-link" href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            <a className="social-link" href="https://x.com" target="_blank" rel="noreferrer">X</a>
          </div>
        </div>
      </footer>

      <div className="chat-widget">
        <button id="chat-toggle" className="chat-toggle" aria-expanded="false">Chat</button>
        <div id="chat-panel" className="chat-panel" hidden>
          <div className="chat-header">
            <strong>Chat DogTown</strong>
            <button id="chat-close" aria-label="Cerrar">✕</button>
          </div>
          <div id="chat-log" className="chat-log" aria-live="polite"></div>
          <form id="chat-form" className="chat-form">
            <input id="chat-input" placeholder="Escribe un mensaje..." />
            <button className="btn" type="submit">Enviar</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default App
