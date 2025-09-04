import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './EditProfile.css';

const EditProfile = () => {
  const { user, updateUser, isAuthenticated } = useUser();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    birthDate: '',
    gender: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    bio: ''
  });

  // Cargar datos del usuario desde el contexto
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        birthDate: user.birthDate || '',
        gender: user.gender || '',
        address: user.address || '',
        city: user.city || '',
        postalCode: user.postalCode || '',
        country: user.country || '',
        bio: user.bio || ''
      });
      if (user.avatar) {
        setAvatarPreview(user.avatar);
      }
    }
  }, [user]);

  // Si no está autenticado, mostrar mensaje
  if (!isAuthenticated || !user) {
    return (
      <div className="edit-profile-container">
        <div className="edit-profile-wrapper">
          <div className="edit-profile-card">
            <h2>Acceso Requerido</h2>
            <p>Por favor, inicia sesión para editar tu perfil.</p>
            <Link to="/login" className="btn btn-primary">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const [avatar, setAvatar] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Limpiar error del campo cuando el usuario empiece a escribir
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          avatar: 'Por favor selecciona un archivo de imagen válido'
        }));
        return;
      }

      // Validar tamaño (máximo 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          avatar: 'La imagen no puede ser mayor a 5MB'
        }));
        return;
      }

      setAvatar(file);
      
      // Crear preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
      };
      reader.readAsDataURL(file);
      
      // Limpiar error
      setErrors(prev => ({
        ...prev,
        avatar: ''
      }));
    }
  };

  const removeAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validar nombre
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'El nombre es obligatorio';
    }

    // Validar apellido
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'El apellido es obligatorio';
    }

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    // Validar teléfono
    const phoneRegex = /^[+]?[0-9\s-()]+$/;
    if (formData.phone && !phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Por favor ingresa un teléfono válido';
    }

    // Validar código postal
    if (formData.postalCode && !/^\d{5}$/.test(formData.postalCode)) {
      newErrors.postalCode = 'El código postal debe tener 5 dígitos';
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
    setSuccessMessage('');

    try {
      // Simular llamada a API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Preparar datos para actualizar
      const updatedData = {
        ...formData,
        avatar: avatarPreview
      };
      
      console.log('Datos actualizados:', updatedData);
      
      // Actualizar usuario en el contexto
      updateUser(updatedData);
      
      setSuccessMessage('¡Perfil actualizado exitosamente!');
      
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      
    } catch (error) {
      setErrors({ general: 'Error al actualizar el perfil. Inténtalo de nuevo.' });
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = () => {
    return `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase();
  };

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-header">
        <div className="breadcrumb">
          <Link to="/perfil">Dashboard</Link>
          <span className="separator">→</span>
          <span className="current">Editar Perfil</span>
        </div>
        <h1>✏️ Editar Perfil</h1>
        <p>Actualiza tu información personal y preferencias</p>
      </div>

      <div className="edit-profile-content">
        <form onSubmit={handleSubmit} className="profile-form">
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

          {/* Sección de Avatar */}
          <div className="form-section avatar-section">
            <h2>📸 Foto de Perfil</h2>
            <div className="avatar-upload">
              <div className="current-avatar">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Preview" className="avatar-preview" />
                ) : (
                  <div className="avatar-placeholder">
                    {getInitials()}
                  </div>
                )}
              </div>
              <div className="avatar-controls">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="avatar-input"
                  id="avatar-upload"
                />
                <label htmlFor="avatar-upload" className="upload-btn">
                  📷 Cambiar Foto
                </label>
                {avatarPreview && (
                  <button
                    type="button"
                    onClick={removeAvatar}
                    className="remove-btn"
                  >
                    🗑️ Eliminar
                  </button>
                )}
              </div>
              {errors.avatar && (
                <span className="error-message">{errors.avatar}</span>
              )}
              <p className="avatar-help">
                Formatos soportados: JPG, PNG, GIF. Tamaño máximo: 5MB
              </p>
            </div>
          </div>

          {/* Información Personal */}
          <div className="form-section">
            <h2>👤 Información Personal</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName" className="form-label required">
                  Nombre
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="Tu nombre"
                />
                {errors.firstName && (
                  <span className="error-message">{errors.firstName}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="lastName" className="form-label required">
                  Apellido
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  placeholder="Tu apellido"
                />
                {errors.lastName && (
                  <span className="error-message">{errors.lastName}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="email" className="form-label required">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="tu@email.com"
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="+34 612 345 678"
                />
                {errors.phone && (
                  <span className="error-message">{errors.phone}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="birthDate" className="form-label">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleInputChange}
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender" className="form-label">
                  Género
                </label>
                <select
                  id="gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="">Seleccionar...</option>
                  <option value="male">Masculino</option>
                  <option value="female">Femenino</option>
                  <option value="other">Otro</option>
                  <option value="prefer-not-to-say">Prefiero no decir</option>
                </select>
              </div>
            </div>
          </div>

          {/* Dirección */}
          <div className="form-section">
            <h2>📍 Dirección</h2>
            <div className="form-group">
              <label htmlFor="address" className="form-label">
                Dirección
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Calle, número, piso..."
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="city" className="form-label">
                  Ciudad
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="form-input"
                  placeholder="Tu ciudad"
                />
              </div>
              <div className="form-group">
                <label htmlFor="postalCode" className="form-label">
                  Código Postal
                </label>
                <input
                  type="text"
                  id="postalCode"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleInputChange}
                  className={`form-input ${errors.postalCode ? 'error' : ''}`}
                  placeholder="28001"
                />
                {errors.postalCode && (
                  <span className="error-message">{errors.postalCode}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="country" className="form-label">
                  País
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  className="form-input"
                >
                  <option value="España">España</option>
                  <option value="México">México</option>
                  <option value="Argentina">Argentina</option>
                  <option value="Colombia">Colombia</option>
                  <option value="Chile">Chile</option>
                  <option value="Perú">Perú</option>
                </select>
              </div>
            </div>
          </div>

          {/* Biografía */}
          <div className="form-section">
            <h2>📝 Sobre Ti</h2>
            <div className="form-group">
              <label htmlFor="bio" className="form-label">
                Biografía
              </label>
              <textarea
                id="bio"
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                className="form-textarea"
                placeholder="Cuéntanos un poco sobre ti..."
                rows={4}
                maxLength={500}
              />
              <div className="character-count">
                {formData.bio.length}/500 caracteres
              </div>
            </div>
          </div>

          {/* Botones de acción */}
          <div className="form-actions">
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
                '💾 Guardar Cambios'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;