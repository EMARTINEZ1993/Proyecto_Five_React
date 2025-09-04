import React from 'react';
import './ContactInfo.css';

const ContactInfo = () => {
  const phoneNumber = import.meta.env.VITE_PHONE_NUMBER;
  const email = import.meta.env.VITE_EMAIL;
  const address = import.meta.env.VITE_ADDRESS;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMERO;

  const handlePhoneClick = () => {
    if (phoneNumber) {
      window.open(`tel:${phoneNumber}`, '_self');
    }
  };

  const handleEmailClick = () => {
    if (email) {
      window.open(`mailto:${email}`, '_self');
    }
  };

  const handleWhatsAppClick = () => {
    if (whatsappNumber) {
      const message = encodeURIComponent('¡Hola! Me interesa conocer más sobre sus productos orgánicos.');
      window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
    }
  };

  return (
    <div className="contact-info-section">
      <h2>📍 Información de Contacto</h2>
      
      <div className="contact-info-grid">
        {/* Teléfono */}
        {phoneNumber && (
          <div className="contact-item" onClick={handlePhoneClick}>
            <div className="contact-icon">📞</div>
            <div className="contact-details">
              <h3>Teléfono</h3>
              <p>{phoneNumber}</p>
              <span className="contact-action">Llamar ahora</span>
            </div>
          </div>
        )}

        {/* Email */}
        {email && (
          <div className="contact-item" onClick={handleEmailClick}>
            <div className="contact-icon">📧</div>
            <div className="contact-details">
              <h3>Email</h3>
              <p>{email}</p>
              <span className="contact-action">Enviar email</span>
            </div>
          </div>
        )}

        {/* Dirección */}
        {address && (
          <div className="contact-item">
            <div className="contact-icon">📍</div>
            <div className="contact-details">
              <h3>Dirección</h3>
              <p>{address}</p>
              <span className="contact-action">Nuestra ubicación</span>
            </div>
          </div>
        )}

        {/* WhatsApp */}
        {whatsappNumber && (
          <div className="contact-item whatsapp" onClick={handleWhatsAppClick}>
            <div className="contact-icon">💬</div>
            <div className="contact-details">
              <h3>WhatsApp</h3>
              <p>{whatsappNumber}</p>
              <span className="contact-action">Chatear ahora</span>
            </div>
          </div>
        )}
      </div>

      <div className="business-hours">
        <h3>🕒 Horarios de Atención</h3>
        <div className="hours-grid">
          <div className="hours-item">
            <span className="day">Lunes - Viernes</span>
            <span className="time">8:00 AM - 6:00 PM</span>
          </div>
          <div className="hours-item">
            <span className="day">Sábados</span>
            <span className="time">8:00 AM - 4:00 PM</span>
          </div>
          <div className="hours-item">
            <span className="day">Domingos</span>
            <span className="time">Cerrado</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;