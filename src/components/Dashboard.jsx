import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user: contextUser, isAuthenticated, logout } = useUser();

  // Si no está autenticado, mostrar mensaje
  if (!isAuthenticated || !contextUser) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-wrapper">
          <div className="dashboard-card">
            <h2>Acceso Requerido</h2>
            <p>Por favor, inicia sesión para acceder a tu dashboard.</p>
            <Link to="/login" className="btn btn-primary">
              Iniciar Sesión
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Datos del usuario desde el contexto
  const [user, setUser] = useState({
    name: `${contextUser.nombre} ${contextUser.apellido}`,
    email: contextUser.email,
    avatar: contextUser.avatar,
    memberSince: contextUser.fechaRegistro,
    lastLogin: contextUser.ultimoAcceso || new Date().toISOString()
  });

  const [stats, setStats] = useState({
    totalOrders: contextUser.estadisticas?.pedidosRealizados || 0,
    totalSpent: contextUser.estadisticas?.ahorroTotal || 0,
    favoriteProducts: contextUser.estadisticas?.productosComprados || 0,
    loyaltyPoints: contextUser.estadisticas?.puntosAcumulados || 0
  });

  const [recentActivity, setRecentActivity] = useState(
    contextUser.historialActividad?.slice(0, 4) || [
      {
        id: 1,
        type: 'profile',
        description: 'Cuenta creada exitosamente',
        date: contextUser.fechaRegistro,
        icon: '👤'
      }
    ]
  );

  const [quickActions] = useState([
    {
      title: 'Editar Perfil',
      description: 'Actualiza tu información personal',
      icon: '👤',
      link: '/perfil/editar',
      color: 'blue'
    },
    {
      title: 'Mis Pedidos',
      description: 'Ver historial de compras',
      icon: '📦',
      link: '/perfil/pedidos',
      color: 'green'
    },
    {
      title: 'Lista de Deseos',
      description: 'Productos que te gustan',
      icon: '❤️',
      link: '/perfil/favoritos',
      color: 'red'
    },
    {
      title: 'Configuración',
      description: 'Preferencias y notificaciones',
      icon: '⚙️',
      link: '/perfil/preferencias',
      color: 'purple'
    }
  ]);

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '¡Buenos días';
    if (hour < 18) return '¡Buenas tardes';
    return '¡Buenas noches';
  };

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
      navigate('/login');
    }
  };

  return (
    <div className="dashboard-container">
      {/* Header del Dashboard */}
      <div className="dashboard-header">
        <div className="welcome-section">
          <div className="user-avatar-container">
            {user.avatar ? (
              <img 
                src={user.avatar} 
                alt={`Foto de ${user.name}`}
                className="user-avatar-image"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div className="user-avatar-placeholder" style={{display: user.avatar ? 'none' : 'flex'}}>
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="welcome-text">
            <h1>{getGreeting()}, {user.name.split(' ')[0]}! 👋</h1>
            <p>Bienvenido de vuelta a tu dashboard de Organi.Live</p>
            <div className="user-info">
              <span className="member-since">
                📅 Miembro desde {formatDate(user.memberSince)}
              </span>
              <span className="last-login">
                🕒 Último acceso: {user.lastLogin}
              </span>
            </div>
          </div>
        </div>
        <div className="header-actions">
          <Link to="/perfil/editar" className="edit-profile-btn">
            ✏️ Editar Perfil
          </Link>
          <button onClick={handleLogout} className="logout-btn">
            🚪 Cerrar Sesión
          </button>
        </div>
      </div>




    </div>
  );
};

export default Dashboard;