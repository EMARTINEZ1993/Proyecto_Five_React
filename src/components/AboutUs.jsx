import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-us-container">
      <div className="about-hero">
        <h1 className="about-title">🌱 Sobre Nosotros</h1>
        <p className="about-subtitle">
          Comprometidos con la salud y el bienestar a través de productos orgánicos de la más alta calidad
        </p>
      </div>

      <div className="about-content">
        <section className="mission-section">
          <div className="content-card">
            <div className="card-icon">🌿</div>
            <h2>Nuestra Misión</h2>
            <p>
              En Organi.Live creemos que la alimentación saludable es la base de una vida plena. 
              Nos dedicamos a ofrecer productos orgánicos certificados, cultivados con amor y respeto 
              por la naturaleza, para que tú y tu familia puedan disfrutar de una alimentación 
              nutritiva y deliciosa.
            </p>
          </div>
        </section>

        <section className="values-section">
          <h2 className="section-title">Nuestros Valores</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Sostenibilidad</h3>
              <p>Cuidamos el planeta con prácticas agrícolas responsables y packaging eco-friendly.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Calidad</h3>
              <p>Seleccionamos cuidadosamente cada producto para garantizar la máxima frescura y sabor.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Comunidad</h3>
              <p>Apoyamos a productores locales y construimos relaciones duraderas con nuestros clientes.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">💚</div>
              <h3>Bienestar</h3>
              <p>Promovemos un estilo de vida saludable a través de la alimentación consciente.</p>
            </div>
          </div>
        </section>

        <section className="story-section">
          <div className="story-content">
            <div className="story-text">
              <h2>Nuestra Historia</h2>
              <p>
                Organi.Live nació en 2020 con la visión de hacer accesibles los productos orgánicos 
                de alta calidad para todas las familias. Comenzamos como un pequeño mercado local 
                y hemos crecido hasta convertirnos en una plataforma digital que conecta a 
                productores orgánicos certificados con consumidores conscientes.
              </p>
              <p>
                Cada producto en nuestra tienda es cuidadosamente seleccionado por nuestro equipo 
                de expertos en nutrición y agricultura orgánica. Trabajamos directamente con 
                granjas familiares y cooperativas que comparten nuestros valores de sostenibilidad 
                y calidad.
              </p>
            </div>
            <div className="story-stats">
              <div className="stat-item">
                <span className="stat-number">500+</span>
                <span className="stat-label">Productos Orgánicos</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">50+</span>
                <span className="stat-label">Productores Locales</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">10,000+</span>
                <span className="stat-label">Familias Satisfechas</span>
              </div>
            </div>
          </div>
        </section>

        <section className="team-section">
          <h2 className="section-title">Nuestro Equipo</h2>
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">👩‍🌾</div>
              <h3>María González</h3>
              <p className="member-role">Fundadora & CEO</p>
              <p>Ingeniera Agrónoma especializada en cultivos orgánicos con más de 15 años de experiencia.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👨‍🔬</div>
              <h3>Carlos Rodríguez</h3>
              <p className="member-role">Director de Calidad</p>
              <p>Especialista en certificaciones orgánicas y control de calidad alimentaria.</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">👩‍💼</div>
              <h3>Ana Martínez</h3>
              <p className="member-role">Gerente de Operaciones</p>
              <p>Experta en logística sostenible y relaciones con productores locales.</p>
            </div>
          </div>
        </section>

        <section className="commitment-section">
          <div className="commitment-card">
            <h2>Nuestro Compromiso Contigo</h2>
            <div className="commitment-list">
              <div className="commitment-item">
                <span className="commitment-icon">✅</span>
                <span>Productos 100% orgánicos certificados</span>
              </div>
              <div className="commitment-item">
                <span className="commitment-icon">🚚</span>
                <span>Entrega fresca y rápida a tu hogar</span>
              </div>
              <div className="commitment-item">
                <span className="commitment-icon">💰</span>
                <span>Precios justos para productores y consumidores</span>
              </div>
              <div className="commitment-item">
                <span className="commitment-icon">🌱</span>
                <span>Packaging 100% biodegradable</span>
              </div>
              <div className="commitment-item">
                <span className="commitment-icon">📞</span>
                <span>Atención al cliente personalizada</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;