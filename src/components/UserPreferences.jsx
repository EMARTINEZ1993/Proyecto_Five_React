import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './UserPreferences.css';

const UserPreferences = () => {
  const [preferences, setPreferences] = useState({
    // Configuración de notificaciones
    emailNotifications: {
      orderUpdates: true,
      promotions: true,
      newsletter: false,
      productRecommendations: true,
      securityAlerts: true
    },
    pushNotifications: {
      orderUpdates: true,
      promotions: false,
      newProducts: true,
      reminders: true
    },
    smsNotifications: {
      orderUpdates: false,
      promotions: false,
      securityAlerts: true
    },
    
    // Configuración de idioma y región
    language: 'es',
    region: 'ES',
    currency: 'EUR',
    timezone: 'Europe/Madrid',
    
    // Configuración de tema y apariencia
    theme: 'light',
    fontSize: 'medium',
    reducedMotion: false,
    highContrast: false,
    
    // Configuración de privacidad
    profileVisibility: 'private',
    dataCollection: {
      analytics: true,
      personalization: true,
      marketing: false
    },
    
    // Configuración de compras
    defaultPaymentMethod: 'card',
    savePaymentInfo: true,
    autoReorder: false,
    wishlistPublic: false
  });

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({});

  const handleNotificationChange = (category, type, value) => {
    setPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [type]: value
      }
    }));
  };

  const handleSimpleChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleDataCollectionChange = (type, value) => {
    setPreferences(prev => ({
      ...prev,
      dataCollection: {
        ...prev.dataCollection,
        [type]: value
      }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setSuccessMessage('');
    setErrors({});

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Aquí iría la lógica real de guardado
      console.log('Preferencias guardadas:', preferences);
      
      setSuccessMessage('¡Preferencias guardadas exitosamente!');
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
    } catch (error) {
      setErrors({ general: 'Error al guardar las preferencias. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('¿Estás seguro de que quieres restaurar todas las preferencias a sus valores por defecto?')) {
      setPreferences({
        emailNotifications: {
          orderUpdates: true,
          promotions: false,
          newsletter: false,
          productRecommendations: false,
          securityAlerts: true
        },
        pushNotifications: {
          orderUpdates: true,
          promotions: false,
          newProducts: false,
          reminders: false
        },
        smsNotifications: {
          orderUpdates: false,
          promotions: false,
          securityAlerts: true
        },
        language: 'es',
        region: 'ES',
        currency: 'EUR',
        timezone: 'Europe/Madrid',
        theme: 'light',
        fontSize: 'medium',
        reducedMotion: false,
        highContrast: false,
        profileVisibility: 'private',
        dataCollection: {
          analytics: false,
          personalization: false,
          marketing: false
        },
        defaultPaymentMethod: 'card',
        savePaymentInfo: false,
        autoReorder: false,
        wishlistPublic: false
      });
    }
  };

  return (
    <div className="preferences-container">
      <div className="preferences-header">
        <div className="breadcrumb">
          <Link to="/perfil">Dashboard</Link>
          <span className="separator">→</span>
          <span className="current">Preferencias</span>
        </div>
        <h1>⚙️ Preferencias</h1>
        <p>Personaliza tu experiencia y configura tus notificaciones</p>
      </div>

      <div className="preferences-content">
        <form onSubmit={handleSubmit} className="preferences-form">
          {/* Mensajes de estado */}
          {errors.general && (
            <div className="error-message general">
              {errors.general}
            </div>
          )}
          
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}

          {/* Notificaciones por Email */}
          <div className="preference-section">
            <h2>📧 Notificaciones por Email</h2>
            <div className="notification-grid">
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Actualizaciones de Pedidos</h3>
                  <p>Recibe confirmaciones y actualizaciones del estado de tus pedidos</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications.orderUpdates}
                    onChange={(e) => handleNotificationChange('emailNotifications', 'orderUpdates', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Promociones y Ofertas</h3>
                  <p>Entérate de descuentos especiales y promociones exclusivas</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications.promotions}
                    onChange={(e) => handleNotificationChange('emailNotifications', 'promotions', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Newsletter</h3>
                  <p>Recibe nuestro boletín semanal con consejos y novedades</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications.newsletter}
                    onChange={(e) => handleNotificationChange('emailNotifications', 'newsletter', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Recomendaciones de Productos</h3>
                  <p>Sugerencias personalizadas basadas en tus compras</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications.productRecommendations}
                    onChange={(e) => handleNotificationChange('emailNotifications', 'productRecommendations', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Alertas de Seguridad</h3>
                  <p>Notificaciones importantes sobre la seguridad de tu cuenta</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.emailNotifications.securityAlerts}
                    onChange={(e) => handleNotificationChange('emailNotifications', 'securityAlerts', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Notificaciones Push */}
          <div className="preference-section">
            <h2>🔔 Notificaciones Push</h2>
            <div className="notification-grid">
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Actualizaciones de Pedidos</h3>
                  <p>Notificaciones instantáneas sobre tus pedidos</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.pushNotifications.orderUpdates}
                    onChange={(e) => handleNotificationChange('pushNotifications', 'orderUpdates', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Promociones</h3>
                  <p>Alertas sobre ofertas limitadas y descuentos flash</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.pushNotifications.promotions}
                    onChange={(e) => handleNotificationChange('pushNotifications', 'promotions', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Nuevos Productos</h3>
                  <p>Sé el primero en conocer nuestros nuevos productos</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.pushNotifications.newProducts}
                    onChange={(e) => handleNotificationChange('pushNotifications', 'newProducts', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Recordatorios</h3>
                  <p>Recordatorios de carrito abandonado y recompra</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.pushNotifications.reminders}
                    onChange={(e) => handleNotificationChange('pushNotifications', 'reminders', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Configuración de Idioma y Región */}
          <div className="preference-section">
            <h2>🌍 Idioma y Región</h2>
            <div className="settings-grid">
              <div className="setting-group">
                <label className="setting-label">Idioma</label>
                <select
                  value={preferences.language}
                  onChange={(e) => handleSimpleChange('language', e.target.value)}
                  className="setting-select"
                >
                  <option value="es">Español</option>
                  <option value="en">English</option>
                  <option value="fr">Français</option>
                  <option value="de">Deutsch</option>
                  <option value="it">Italiano</option>
                </select>
              </div>
              
              <div className="setting-group">
                <label className="setting-label">Región</label>
                <select
                  value={preferences.region}
                  onChange={(e) => handleSimpleChange('region', e.target.value)}
                  className="setting-select"
                >
                  <option value="ES">España</option>
                  <option value="MX">México</option>
                  <option value="AR">Argentina</option>
                  <option value="CO">Colombia</option>
                  <option value="CL">Chile</option>
                  <option value="PE">Perú</option>
                </select>
              </div>
              
              <div className="setting-group">
                <label className="setting-label">Moneda</label>
                <select
                  value={preferences.currency}
                  onChange={(e) => handleSimpleChange('currency', e.target.value)}
                  className="setting-select"
                >
                  <option value="EUR">Euro (€)</option>
                  <option value="USD">Dólar (US$)</option>
                  <option value="MXN">Peso Mexicano (MX$)</option>
                  <option value="ARS">Peso Argentino (AR$)</option>
                  <option value="CLP">Peso Chileno (CL$)</option>
                  <option value="COP">Peso Colombiano (CO$)</option>
                </select>
              </div>
              
              <div className="setting-group">
                <label className="setting-label">Zona Horaria</label>
                <select
                  value={preferences.timezone}
                  onChange={(e) => handleSimpleChange('timezone', e.target.value)}
                  className="setting-select"
                >
                  <option value="Europe/Madrid">Madrid (GMT+1)</option>
                  <option value="America/Mexico_City">Ciudad de México (GMT-6)</option>
                  <option value="America/Argentina/Buenos_Aires">Buenos Aires (GMT-3)</option>
                  <option value="America/Bogota">Bogotá (GMT-5)</option>
                  <option value="America/Santiago">Santiago (GMT-3)</option>
                  <option value="America/Lima">Lima (GMT-5)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Configuración de Tema y Apariencia */}
          <div className="preference-section">
            <h2>🎨 Tema y Apariencia</h2>
            <div className="settings-grid">
              <div className="setting-group">
                <label className="setting-label">Tema</label>
                <div className="theme-options">
                  <label className="theme-option">
                    <input
                      type="radio"
                      name="theme"
                      value="light"
                      checked={preferences.theme === 'light'}
                      onChange={(e) => handleSimpleChange('theme', e.target.value)}
                    />
                    <span className="theme-preview light">☀️ Claro</span>
                  </label>
                  <label className="theme-option">
                    <input
                      type="radio"
                      name="theme"
                      value="dark"
                      checked={preferences.theme === 'dark'}
                      onChange={(e) => handleSimpleChange('theme', e.target.value)}
                    />
                    <span className="theme-preview dark">🌙 Oscuro</span>
                  </label>
                  <label className="theme-option">
                    <input
                      type="radio"
                      name="theme"
                      value="auto"
                      checked={preferences.theme === 'auto'}
                      onChange={(e) => handleSimpleChange('theme', e.target.value)}
                    />
                    <span className="theme-preview auto">🔄 Automático</span>
                  </label>
                </div>
              </div>
              
              <div className="setting-group">
                <label className="setting-label">Tamaño de Fuente</label>
                <select
                  value={preferences.fontSize}
                  onChange={(e) => handleSimpleChange('fontSize', e.target.value)}
                  className="setting-select"
                >
                  <option value="small">Pequeña</option>
                  <option value="medium">Mediana</option>
                  <option value="large">Grande</option>
                  <option value="extra-large">Extra Grande</option>
                </select>
              </div>
            </div>
            
            <div className="accessibility-options">
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Reducir Animaciones</h3>
                  <p>Minimiza las animaciones para una experiencia más cómoda</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.reducedMotion}
                    onChange={(e) => handleSimpleChange('reducedMotion', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <h3>Alto Contraste</h3>
                  <p>Aumenta el contraste para mejorar la legibilidad</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.highContrast}
                    onChange={(e) => handleSimpleChange('highContrast', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Configuración de Privacidad */}
          <div className="preference-section">
            <h2>🔒 Privacidad y Datos</h2>
            <div className="settings-grid">
              <div className="setting-group">
                <label className="setting-label">Visibilidad del Perfil</label>
                <select
                  value={preferences.profileVisibility}
                  onChange={(e) => handleSimpleChange('profileVisibility', e.target.value)}
                  className="setting-select"
                >
                  <option value="private">Privado</option>
                  <option value="friends">Solo Amigos</option>
                  <option value="public">Público</option>
                </select>
              </div>
            </div>
            
            <div className="data-collection">
              <h3>Recopilación de Datos</h3>
              <div className="notification-item">
                <div className="notification-info">
                  <h4>Análisis y Estadísticas</h4>
                  <p>Ayúdanos a mejorar nuestros servicios con datos anónimos</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.dataCollection.analytics}
                    onChange={(e) => handleDataCollectionChange('analytics', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <h4>Personalización</h4>
                  <p>Permite que personalicemos tu experiencia de compra</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.dataCollection.personalization}
                    onChange={(e) => handleDataCollectionChange('personalization', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
              
              <div className="notification-item">
                <div className="notification-info">
                  <h4>Marketing</h4>
                  <p>Utilizar tus datos para campañas de marketing dirigidas</p>
                </div>
                <label className="toggle-switch">
                  <input
                    type="checkbox"
                    checked={preferences.dataCollection.marketing}
                    onChange={(e) => handleDataCollectionChange('marketing', e.target.checked)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="form-actions">
            <button
              type="button"
              onClick={resetToDefaults}
              className="reset-btn"
            >
              🔄 Restaurar Valores por Defecto
            </button>
            <div className="main-actions">
              <Link to="/perfil" className="cancel-btn">
                Cancelar
              </Link>
              <button
                type="submit"
                className={`save-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="loading-spinner"></div>
                    Guardando...
                  </>
                ) : (
                  '💾 Guardar Preferencias'
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserPreferences;