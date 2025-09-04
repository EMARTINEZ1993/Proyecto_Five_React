import React, { useState } from 'react';
import { sendContactMessage } from '../utils/googleSheetsService';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { name, email, message } = formData;
    
    if (!name.trim()) {
      alert('Por favor ingresa tu nombre');
      return false;
    }
    
    if (!email.trim()) {
      alert('Por favor ingresa tu email');
      return false;
    }
    
    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Por favor ingresa un email válido');
      return false;
    }
    
    if (!message.trim()) {
      alert('Por favor ingresa tu mensaje');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const result = await sendContactMessage(formData);
      
      if (result.success) {
        setSubmitStatus({ type: 'success', message: '¡Mensaje enviado correctamente!' });
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: ''
        });
      } else {
        setSubmitStatus({ type: 'error', message: result.message || 'Error al enviar mensaje' });
      }
    } catch (error) {
      console.error('Error al enviar formulario:', error);
      setSubmitStatus({ type: 'error', message: 'Error al enviar mensaje' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="contact-form-section">
      <h2>📧 Contáctanos</h2>
      <p>¿Tienes preguntas sobre nuestros productos orgánicos? ¡Escríbenos!</p>
      
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Nombre *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Tu nombre completo"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Teléfono</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Tu número de teléfono"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Mensaje *</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Cuéntanos en qué podemos ayudarte..."
            rows={5}
            required
          />
        </div>

        {submitStatus && (
          <div className={`submit-status ${submitStatus.type}`}>
            {submitStatus.message}
          </div>
        )}

        <button 
          type="submit" 
          className="submit-btn"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;