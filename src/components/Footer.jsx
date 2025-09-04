import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="app-footer">
      <div className="footer-content">
        {/* Información de la empresa */}
        <div className="footer-section">
          <h3>🌱 Organi.Live</h3>
          <p>
            Productos orgánicos frescos y naturales, cultivados con amor 
            y respeto por el medio ambiente.
          </p>
          <div className="social-links">
            <span>Síguenos en:</span>
            <div className="social-icons">
              <span><i className="fa-brands fa-whatsapp"></i></span>
                <span><i className="fa-brands fa-facebook"></i></span>
                <span><i className="fa-brands fa-x-twitter"></i></span>
            </div>
          </div>
        </div>

        {/* Características */}
        <div className="footer-section">
          <h4>✨ Nuestras Características</h4>
          <ul>
            <li>🌿 100% Orgánico</li>
            <li>🚚 Entrega Fresca</li>
            <li>🏡 Productos Locales</li>
            <li>♻️ Sostenible</li>
            <li>💚 Sin Químicos</li>
          </ul>
        </div>

        {/* Enlaces rápidos */}
        <div className="footer-section">
          <h4>🔗 Enlaces Rápidos</h4>
          <ul>
            <li><a href="#productos">Productos</a></li>
            <li><a href="#contacto">Contacto</a></li>
            <li><a href="#nosotros">Sobre Nosotros</a></li>
            <li><a href="#blog">Blog</a></li>
            <li><a href="#faq">Preguntas Frecuentes</a></li>
          </ul>
        </div>

        {/* Información de contacto */}
        <div className="footer-section">
          <h4>📞 Contacto Rápido</h4>
          <div className="contact-quick">
            <p>📱 WhatsApp: {import.meta.env.VITE_WHATSAPP_NUMERO}</p>
            <p>📧 Email: {import.meta.env.VITE_EMAIL}</p>
            <p>📍 {import.meta.env.VITE_ADDRESS}</p>
          </div>
        </div>
      </div>

      {/* Línea de copyright */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>
            © {currentYear} Organi.Live. Todos los derechos reservados. 
            Hecho con 💚 para un mundo más saludable.
          </p>
          <div className="footer-badges">
            <span className="badge">🌱 Certificado Orgánico</span>
            <span className="badge">♻️ Eco-Friendly</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;