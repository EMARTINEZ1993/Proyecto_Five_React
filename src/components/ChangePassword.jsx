import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ChangePassword.css';

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [passwordStrength, setPasswordStrength] = useState({
    score: 0,
    feedback: []
  });

  // Validación de contraseña
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    
    let score = 0;
    const feedback = [];
    
    if (password.length >= minLength) {
      score += 1;
    } else {
      feedback.push('Debe tener al menos 8 caracteres');
    }
    
    if (hasUpperCase) {
      score += 1;
    } else {
      feedback.push('Debe incluir al menos una letra mayúscula');
    }
    
    if (hasLowerCase) {
      score += 1;
    } else {
      feedback.push('Debe incluir al menos una letra minúscula');
    }
    
    if (hasNumbers) {
      score += 1;
    } else {
      feedback.push('Debe incluir al menos un número');
    }
    
    if (hasSpecialChar) {
      score += 1;
    } else {
      feedback.push('Debe incluir al menos un carácter especial');
    }
    
    return { score, feedback };
  };

  const getPasswordStrengthText = (score) => {
    switch (score) {
      case 0:
      case 1:
        return 'Muy débil';
      case 2:
        return 'Débil';
      case 3:
        return 'Regular';
      case 4:
        return 'Fuerte';
      case 5:
        return 'Muy fuerte';
      default:
        return 'Muy débil';
    }
  };

  const getPasswordStrengthColor = (score) => {
    switch (score) {
      case 0:
      case 1:
        return '#f44336';
      case 2:
        return '#ff9800';
      case 3:
        return '#ffeb3b';
      case 4:
        return '#8bc34a';
      case 5:
        return '#4caf50';
      default:
        return '#f44336';
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpiar errores cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Evaluar fortaleza de la nueva contraseña
    if (name === 'newPassword') {
      const strength = validatePassword(value);
      setPasswordStrength(strength);
    }

    // Limpiar mensaje de éxito
    if (successMessage) {
      setSuccessMessage('');
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar contraseña actual
    if (!formData.currentPassword.trim()) {
      newErrors.currentPassword = 'La contraseña actual es requerida';
    }

    // Validar nueva contraseña
    if (!formData.newPassword.trim()) {
      newErrors.newPassword = 'La nueva contraseña es requerida';
    } else {
      const strength = validatePassword(formData.newPassword);
      if (strength.score < 3) {
        newErrors.newPassword = 'La contraseña debe ser más segura';
      }
    }

    // Validar confirmación de contraseña
    if (!formData.confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirma tu nueva contraseña';
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    // Verificar que la nueva contraseña sea diferente a la actual
    if (formData.currentPassword && formData.newPassword && 
        formData.currentPassword === formData.newPassword) {
      newErrors.newPassword = 'La nueva contraseña debe ser diferente a la actual';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // Simular llamada a la API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simular validación de contraseña actual
      const isCurrentPasswordValid = Math.random() > 0.2; // 80% de éxito
      
      if (!isCurrentPasswordValid) {
        setErrors({ currentPassword: 'La contraseña actual es incorrecta' });
        return;
      }

      // Éxito
      setSuccessMessage('¡Contraseña cambiada exitosamente!');
      setFormData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setPasswordStrength({ score: 0, feedback: [] });
      
      // Limpiar mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
      
    } catch (error) {
      setErrors({ 
        general: 'Error al cambiar la contraseña. Inténtalo de nuevo.' 
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
    setErrors({});
    setSuccessMessage('');
    setPasswordStrength({ score: 0, feedback: [] });
  };

  return (
    <div className="change-password-container">
      <div className="change-password-header">
        <div className="breadcrumb">
          <Link to="/perfil">Dashboard</Link>
          <span className="separator">→</span>
          <span className="current">Cambiar Contraseña</span>
        </div>
        <h1>🔒 Cambiar Contraseña</h1>
        <p>Actualiza tu contraseña para mantener tu cuenta segura</p>
      </div>

      <div className="change-password-content">
        {/* Consejos de seguridad */}
        <div className="security-tips">
          <h3>💡 Consejos para una contraseña segura</h3>
          <ul>
            <li>Usa al menos 8 caracteres</li>
            <li>Combina letras mayúsculas y minúsculas</li>
            <li>Incluye números y símbolos especiales</li>
            <li>Evita información personal (nombres, fechas)</li>
            <li>No reutilices contraseñas de otras cuentas</li>
          </ul>
        </div>

        {/* Formulario */}
        <div className="change-password-form-container">
          <form onSubmit={handleSubmit} className="change-password-form">
            {/* Mensaje de éxito */}
            {successMessage && (
              <div className="success-message">
                <span className="success-icon">✅</span>
                {successMessage}
              </div>
            )}

            {/* Error general */}
            {errors.general && (
              <div className="error-message">
                <span className="error-icon">❌</span>
                {errors.general}
              </div>
            )}

            {/* Contraseña actual */}
            <div className="form-group">
              <label htmlFor="currentPassword" className="form-label">
                Contraseña Actual *
              </label>
              <div className="password-input-container">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.currentPassword ? 'error' : ''}`}
                  placeholder="Ingresa tu contraseña actual"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showPasswords.current ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.currentPassword && (
                <span className="error-text">{errors.currentPassword}</span>
              )}
            </div>

            {/* Nueva contraseña */}
            <div className="form-group">
              <label htmlFor="newPassword" className="form-label">
                Nueva Contraseña *
              </label>
              <div className="password-input-container">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.newPassword ? 'error' : ''}`}
                  placeholder="Ingresa tu nueva contraseña"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showPasswords.new ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              
              {/* Indicador de fortaleza */}
              {formData.newPassword && (
                <div className="password-strength">
                  <div className="strength-bar">
                    <div 
                      className="strength-fill"
                      style={{
                        width: `${(passwordStrength.score / 5) * 100}%`,
                        backgroundColor: getPasswordStrengthColor(passwordStrength.score)
                      }}
                    ></div>
                  </div>
                  <div className="strength-info">
                    <span 
                      className="strength-text"
                      style={{ color: getPasswordStrengthColor(passwordStrength.score) }}
                    >
                      {getPasswordStrengthText(passwordStrength.score)}
                    </span>
                    {passwordStrength.feedback.length > 0 && (
                      <div className="strength-feedback">
                        {passwordStrength.feedback.map((tip, index) => (
                          <div key={index} className="feedback-item">
                            • {tip}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
              
              {errors.newPassword && (
                <span className="error-text">{errors.newPassword}</span>
              )}
            </div>

            {/* Confirmar contraseña */}
            <div className="form-group">
              <label htmlFor="confirmPassword" className="form-label">
                Confirmar Nueva Contraseña *
              </label>
              <div className="password-input-container">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                  placeholder="Confirma tu nueva contraseña"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="password-toggle"
                  disabled={isLoading}
                >
                  {showPasswords.confirm ? '👁️' : '👁️‍🗨️'}
                </button>
              </div>
              {errors.confirmPassword && (
                <span className="error-text">{errors.confirmPassword}</span>
              )}
              
              {/* Indicador de coincidencia */}
              {formData.confirmPassword && formData.newPassword && (
                <div className="password-match">
                  {formData.newPassword === formData.confirmPassword ? (
                    <span className="match-success">✅ Las contraseñas coinciden</span>
                  ) : (
                    <span className="match-error">❌ Las contraseñas no coinciden</span>
                  )}
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="form-actions">
              <button
                type="button"
                onClick={handleCancel}
                className="btn-cancel"
                disabled={isLoading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="btn-submit"
                disabled={isLoading || Object.keys(errors).length > 0}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Cambiando...
                  </>
                ) : (
                  'Cambiar Contraseña'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Información adicional */}
        <div className="additional-info">
          <div className="info-card">
            <h4>🔐 Seguridad de la Cuenta</h4>
            <p>
              Cambiar tu contraseña regularmente ayuda a mantener tu cuenta segura. 
              Te recomendamos cambiarla cada 3-6 meses.
            </p>
          </div>
          
          <div className="info-card">
            <h4>📱 Autenticación de Dos Factores</h4>
            <p>
              Para mayor seguridad, considera activar la autenticación de dos factores 
              en la configuración de tu cuenta.
            </p>
            <Link to="/perfil/preferencias" className="info-link">
              Configurar 2FA →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;