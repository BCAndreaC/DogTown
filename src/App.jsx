import { useState } from "react";

useState;
function App() {
  const slides = [
    {
      src: "/assets/images/guarderiaperros.png",
      title: "Hotel",
      alt: "Hotel canino",
    },
    { src: "/assets/images/spaperruno.png", title: "Spa", alt: "Spa canino" },
    { src: "/assets/images/paseoperruno.jpg", title: "Paseo", alt: "Paseos" },
    {
      src: "/assets/images/consultaperruna.jpg",
      title: "Consulta",
      alt: "Consulta",
    },
  ];
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <header className="site-header">
        <div className="container header-inner">
          <a className="logo" href="#inicio" aria-label="DogTown home">
            <img
              src="assets/images/hero-dog.svg"
              alt="DogTown"
              width="36"
              height="27"
            />
            <span>DogTown</span>
          </a>
          <nav className="main-nav" aria-label="Principal">
            <button
              className="nav-toggle"
              aria-expanded="false"
              aria-controls="menu"
            >
              ☰
            </button>
            <ul id="menu" className="nav-list">
              <li>
                <a href="#quienes">Nosotros</a>
              </li>
              <li>
                <a href="#ubicacion">Ubicación</a>
              </li>
              <li>
                <a href="shop.html">Tienda</a>
              </li>
              <li>
                <a href="#faq">FAQ</a>
              </li>
              <li>
                <a href="#contacto" className="btn">
                  Contáctame
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main id="inicio">
        <section className="hero container">
          <div>
            <h1>Hotel para perros con amor y cuidado</h1>
            <p>
              Hotel, guardería y paseos para perros con servicio profesional.
              Reserva en línea y disfruta la tranquilidad de saber que tu peludo
              está en las mejores manos.
            </p>
            <a href="#contacto" className="btn">
              Reservar
            </a>
          </div>
          <div className="hero-art">
            <img
              src="/assets/images/hotelperruno1.jpg"
              alt="Ilustración perro feliz"
            />
          </div>
        </section>
        <div className="container">
          <h2>Nuestros servicios</h2>
        </div>
        {/* SLIDER */}
        <section className="dog-slider-section">
          <div className="container">
            <div className="dog-slider">
              <button
                className="dog-slide-btn"
                aria-label="Anterior"
                onClick={prevSlide}
              >
                ‹
              </button>

              <div className="dog-slider-viewport">
                <div
                  className="dog-slider-track"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {slides.map((slide) => (
                    <div className="dog-slide" key={slide.src}>
                      <img src={slide.src} alt={slide.alt} />
                      <h3>{slide.title}</h3>
                    </div>
                  ))}
                </div>
              </div>

              <button
                className="dog-slide-btn"
                aria-label="Siguiente"
                onClick={nextSlide}
              >
                ›
              </button>
            </div>

            {/* Dots */}
            <div className="dog-slider-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`dog-dot ${
                    index === currentIndex ? "dog-dot-active" : ""
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Ir al slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="quienes" className="section container">
          <div className="grid-2">
            <div>
              <h2>¿Quiénes somos?</h2>
              <p>
                Somos un hotel y tienda para perros dedicado al bienestar,
                diversión y seguridad de tu mejor amigo.
              </p>
            </div>
            <div>
              <h2>¿Qué hacemos?</h2>
              <p>
                Ofrecemos hospedaje, spa, paseos diarios y adiestramiento
                positivo con profesionales certificados.
              </p>
            </div>
          </div>
        </section>

        <section id="vision-mision" className="section container">
          <div className="grid-2">
            <div>
              <h2>Visión</h2>
              <p>
                Ser el espacio favorito de los tutores para el cuidado integral
                de sus perros en la ciudad.
              </p>
            </div>
            <div>
              <h2>Misión</h2>
              <p>
                Brindar experiencias seguras, amorosas y personalizadas que
                mejoren la calidad de vida de cada perro.
              </p>
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
            <p>
              Trae su cartilla de vacunación, alimento y una manta u objeto
              familiar.
            </p>
          </details>
          <details>
            <summary>¿Aceptan todas las razas?</summary>
            <p>
              Sí, realizamos una evaluación previa para asegurar su bienestar.
            </p>
          </details>
          <details>
            <summary>¿Cómo funcionan los paseos?</summary>
            <p>
              Salimos en grupos pequeños con arnés y rutas seguras del
              vecindario.
            </p>
          </details>
        </section>

        <section id="contacto" className="section container">
          <div className="grid-2">
            <div>
              <h2>¡Contáctanos!</h2>
              <p>
                ¿Tienes dudas o quieres reservar? Escríbenos y te respondemos
                pronto.
              </p>
              <form id="contact-form" className="contact-form">
                <div className="form-row">
                  <label htmlFor="nombre">Nombre del dueño</label>
                  <input
                    id="nombre"
                    name="nombre"
                    required
                    placeholder="Juan Perez"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="nombre">Nombre de tu mascota</label>
                  <input
                    id="nombre"
                    name="nombre"
                    required
                    placeholder="Muffin"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="juan@gmail.com"
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="mensaje">Mensaje</label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows={4}
                    required
                  ></textarea>
                </div>
                <button className="btn" type="submit">
                  Enviar
                </button>
                <div
                  id="contact-feedback"
                  className="feedback"
                  aria-live="polite"
                ></div>
              </form>
            </div>
            <div>
              <h3>Síguenos</h3>
              <p>
                Encuéntranos en redes sociales para ver promos, tips y fotos de
                perritos felices:
              </p>

              <div className="social">
                <a
                  className="social-link"
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  👍 Facebook / @dogtown.mx
                </a>
                <a
                  className="social-link"
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  📸 Instagram / @dogtown.mx
                </a>
                <a
                  className="social-link"
                  href="https://x.com"
                  target="_blank"
                  rel="noreferrer"
                >
                  🐾 X / @dogtown.mx
                </a>
              </div>

              <p className="social-meta">
                Resolvemos mensajes de <strong>9:00 a 19:00</strong> (hora
                local). Más de <strong>100 perritos</strong> han disfrutado
                DogTown. 🐶✨
              </p>

              <a
                className="social-cta"
                href="https://wa.me/"
                target="_blank"
                rel="noreferrer"
              >
                💬 Escríbenos por WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div>
            © <span id="year">2025</span> DogTown
          </div>
          <div className="social">
            <a
              className="social-link"
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
            >
              <i className="fab fa-facebook"></i> Facebook
            </a>
            <a
              className="social-link"
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <i className="fab fa-instagram"></i> Instagram
            </a>
            <a
              className="social-link"
              href="https://x.com"
              target="_blank"
              rel="noreferrer"
              aria-label="X"
            >
              <i className="fab fa-twitter"></i> X
            </a>
          </div>
        </div>
      </footer>

      <div className="chat-widget">
        <button
          className="chat-toggle"
          aria-expanded={isChatOpen}
          onClick={() => setIsChatOpen(!isChatOpen)}
        >
          Chat
        </button>

        {isChatOpen && (
          <div className="chat-panel">
            <div className="chat-header">
              <strong>Chat DogTown</strong>
              <button
                className="chat-close"
                onClick={() => setIsChatOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="chat-log">
              {chatMessages.length === 0 && (
                <p className="chat-empty">¡Hola! 🐶 ¿En qué puedo ayudarte?</p>
              )}

              {chatMessages.map((msg, index) => (
                <div key={index} className="chat-message">
                  <p>
                    <strong>Tú:</strong> {msg.user}
                  </p>
                  <p>
                    <strong>DogBot:</strong> {msg.bot}
                  </p>
                </div>
              ))}
            </div>

            <form
              className="chat-form"
              onSubmit={(e) => {
                e.preventDefault();
                if (!chatInput.trim()) return;

                const text = chatInput.trim();

                setChatMessages((prev) => [
                  ...prev,
                  {
                    user: text,
                    bot: "Gracias por escribir 👌🐶, un humano te contestará pronto.",
                  },
                ]);

                setChatInput("");
              }}
            >
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
              />
              <button type="submit" className="btn">
                Enviar
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
