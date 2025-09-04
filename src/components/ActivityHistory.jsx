import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ActivityHistory.css';

const ActivityHistory = () => {
  const [activities, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: '30',
    search: ''
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Datos simulados de actividad
  const mockActivities = [
    {
      id: 1,
      type: 'order',
      action: 'Pedido realizado',
      description: 'Pedido #ORG-2024-001 por €45.99',
      timestamp: new Date('2024-01-15T10:30:00'),
      status: 'completed',
      details: {
        orderId: 'ORG-2024-001',
        amount: 45.99,
        items: 3
      }
    },
    {
      id: 2,
      type: 'profile',
      action: 'Perfil actualizado',
      description: 'Información personal modificada',
      timestamp: new Date('2024-01-14T16:45:00'),
      status: 'completed',
      details: {
        fields: ['email', 'teléfono']
      }
    },
    {
      id: 3,
      type: 'security',
      action: 'Contraseña cambiada',
      description: 'Contraseña actualizada exitosamente',
      timestamp: new Date('2024-01-14T14:20:00'),
      status: 'completed',
      details: {}
    },
    {
      id: 4,
      type: 'order',
      action: 'Pedido cancelado',
      description: 'Pedido #ORG-2024-002 cancelado por el usuario',
      timestamp: new Date('2024-01-13T09:15:00'),
      status: 'cancelled',
      details: {
        orderId: 'ORG-2024-002',
        reason: 'Cambio de opinión'
      }
    },
    {
      id: 5,
      type: 'wishlist',
      action: 'Producto añadido a favoritos',
      description: 'Aceite de Oliva Ecológico Premium añadido a la lista de deseos',
      timestamp: new Date('2024-01-12T18:30:00'),
      status: 'completed',
      details: {
        productName: 'Aceite de Oliva Ecológico Premium'
      }
    },
    {
      id: 6,
      type: 'login',
      action: 'Inicio de sesión',
      description: 'Acceso desde dispositivo móvil',
      timestamp: new Date('2024-01-12T08:45:00'),
      status: 'completed',
      details: {
        device: 'Mobile',
        location: 'Madrid, España'
      }
    },
    {
      id: 7,
      type: 'preferences',
      action: 'Preferencias actualizadas',
      description: 'Configuración de notificaciones modificada',
      timestamp: new Date('2024-01-11T20:10:00'),
      status: 'completed',
      details: {
        changes: ['notificaciones email', 'tema oscuro']
      }
    },
    {
      id: 8,
      type: 'order',
      action: 'Pedido entregado',
      description: 'Pedido #ORG-2024-003 entregado exitosamente',
      timestamp: new Date('2024-01-10T15:20:00'),
      status: 'delivered',
      details: {
        orderId: 'ORG-2024-003',
        deliveryAddress: 'Calle Mayor 123, Madrid'
      }
    },
    {
      id: 9,
      type: 'review',
      action: 'Reseña publicada',
      description: 'Reseña de 5 estrellas para Miel Orgánica de Montaña',
      timestamp: new Date('2024-01-09T12:30:00'),
      status: 'completed',
      details: {
        productName: 'Miel Orgánica de Montaña',
        rating: 5
      }
    },
    {
      id: 10,
      type: 'support',
      action: 'Ticket de soporte creado',
      description: 'Consulta sobre tiempo de entrega - Ticket #SUP-001',
      timestamp: new Date('2024-01-08T11:15:00'),
      status: 'resolved',
      details: {
        ticketId: 'SUP-001',
        category: 'Entrega'
      }
    },
    {
      id: 11,
      type: 'login',
      action: 'Inicio de sesión',
      description: 'Acceso desde navegador web',
      timestamp: new Date('2024-01-07T19:45:00'),
      status: 'completed',
      details: {
        device: 'Desktop',
        location: 'Madrid, España'
      }
    },
    {
      id: 12,
      type: 'order',
      action: 'Pedido realizado',
      description: 'Pedido #ORG-2024-004 por €78.50',
      timestamp: new Date('2024-01-05T14:20:00'),
      status: 'processing',
      details: {
        orderId: 'ORG-2024-004',
        amount: 78.50,
        items: 5
      }
    }
  ];

  useEffect(() => {
    // Simular carga de datos
    const loadActivities = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setActivities(mockActivities);
      setIsLoading(false);
    };

    loadActivities();
  }, []);

  useEffect(() => {
    // Aplicar filtros
    let filtered = [...activities];

    // Filtrar por tipo
    if (filters.type !== 'all') {
      filtered = filtered.filter(activity => activity.type === filters.type);
    }

    // Filtrar por rango de fechas
    const now = new Date();
    const daysAgo = parseInt(filters.dateRange);
    if (daysAgo > 0) {
      const cutoffDate = new Date(now.getTime() - (daysAgo * 24 * 60 * 60 * 1000));
      filtered = filtered.filter(activity => activity.timestamp >= cutoffDate);
    }

    // Filtrar por búsqueda
    if (filters.search.trim()) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(activity => 
        activity.action.toLowerCase().includes(searchTerm) ||
        activity.description.toLowerCase().includes(searchTerm)
      );
    }

    // Ordenar por fecha (más reciente primero)
    filtered.sort((a, b) => b.timestamp - a.timestamp);

    setFilteredActivities(filtered);
    setCurrentPage(1);
  }, [activities, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const getActivityIcon = (type) => {
    const icons = {
      order: '🛒',
      profile: '👤',
      security: '🔒',
      wishlist: '❤️',
      login: '🔑',
      preferences: '⚙️',
      review: '⭐',
      support: '🎧'
    };
    return icons[type] || '📝';
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: 'success',
      processing: 'warning',
      cancelled: 'error',
      delivered: 'success',
      resolved: 'success'
    };
    return colors[status] || 'default';
  };

  const getStatusText = (status) => {
    const texts = {
      completed: 'Completado',
      processing: 'En proceso',
      cancelled: 'Cancelado',
      delivered: 'Entregado',
      resolved: 'Resuelto'
    };
    return texts[status] || status;
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getRelativeTime = (date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'Hace un momento';
    if (diffInSeconds < 3600) return `Hace ${Math.floor(diffInSeconds / 60)} min`;
    if (diffInSeconds < 86400) return `Hace ${Math.floor(diffInSeconds / 3600)} h`;
    if (diffInSeconds < 604800) return `Hace ${Math.floor(diffInSeconds / 86400)} días`;
    
    return formatDate(date);
  };

  // Paginación
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentActivities = filteredActivities.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="activity-history-container">
      <div className="activity-header">
        <div className="breadcrumb">
          <Link to="/perfil">Dashboard</Link>
          <span className="separator">→</span>
          <span className="current">Historial de Actividad</span>
        </div>
        <h1>📊 Historial de Actividad</h1>
        <p>Revisa todas tus acciones y actividades en la plataforma</p>
      </div>

      <div className="activity-content">
        {/* Filtros */}
        <div className="activity-filters">
          <div className="filter-group">
            <label className="filter-label">Tipo de Actividad</label>
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="filter-select"
            >
              <option value="all">Todas las actividades</option>
              <option value="order">Pedidos</option>
              <option value="profile">Perfil</option>
              <option value="security">Seguridad</option>
              <option value="wishlist">Lista de deseos</option>
              <option value="login">Inicios de sesión</option>
              <option value="preferences">Preferencias</option>
              <option value="review">Reseñas</option>
              <option value="support">Soporte</option>
            </select>
          </div>

          <div className="filter-group">
            <label className="filter-label">Período</label>
            <select
              value={filters.dateRange}
              onChange={(e) => handleFilterChange('dateRange', e.target.value)}
              className="filter-select"
            >
              <option value="7">Últimos 7 días</option>
              <option value="30">Últimos 30 días</option>
              <option value="90">Últimos 3 meses</option>
              <option value="365">Último año</option>
              <option value="0">Todo el tiempo</option>
            </select>
          </div>

          <div className="filter-group search-group">
            <label className="filter-label">Buscar</label>
            <div className="search-input-container">
              <input
                type="text"
                placeholder="Buscar actividades..."
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                className="search-input"
              />
              <span className="search-icon">🔍</span>
            </div>
          </div>
        </div>

        {/* Estadísticas rápidas */}
        <div className="activity-stats">
          <div className="stat-card">
            <div className="stat-icon">📈</div>
            <div className="stat-info">
              <div className="stat-number">{filteredActivities.length}</div>
              <div className="stat-label">Actividades</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🛒</div>
            <div className="stat-info">
              <div className="stat-number">{filteredActivities.filter(a => a.type === 'order').length}</div>
              <div className="stat-label">Pedidos</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🔑</div>
            <div className="stat-info">
              <div className="stat-number">{filteredActivities.filter(a => a.type === 'login').length}</div>
              <div className="stat-label">Accesos</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⭐</div>
            <div className="stat-info">
              <div className="stat-number">{filteredActivities.filter(a => a.type === 'review').length}</div>
              <div className="stat-label">Reseñas</div>
            </div>
          </div>
        </div>

        {/* Lista de actividades */}
        <div className="activity-list">
          {isLoading ? (
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <p>Cargando historial de actividad...</p>
            </div>
          ) : currentActivities.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📭</div>
              <h3>No se encontraron actividades</h3>
              <p>No hay actividades que coincidan con los filtros seleccionados.</p>
            </div>
          ) : (
            <>
              {currentActivities.map((activity) => (
                <div key={activity.id} className="activity-item">
                  <div className="activity-icon">
                    {getActivityIcon(activity.type)}
                  </div>
                  <div className="activity-content">
                    <div className="activity-main">
                      <div className="activity-header">
                        <h3 className="activity-title">{activity.action}</h3>
                        <div className="activity-meta">
                          <span className={`activity-status ${getStatusColor(activity.status)}`}>
                            {getStatusText(activity.status)}
                          </span>
                          <span className="activity-time">
                            {getRelativeTime(activity.timestamp)}
                          </span>
                        </div>
                      </div>
                      <p className="activity-description">{activity.description}</p>
                      
                      {/* Detalles específicos por tipo */}
                      {activity.details && Object.keys(activity.details).length > 0 && (
                        <div className="activity-details">
                          {activity.type === 'order' && activity.details.orderId && (
                            <div className="detail-item">
                              <span className="detail-label">ID del pedido:</span>
                              <span className="detail-value">{activity.details.orderId}</span>
                            </div>
                          )}
                          {activity.details.amount && (
                            <div className="detail-item">
                              <span className="detail-label">Importe:</span>
                              <span className="detail-value">€{activity.details.amount}</span>
                            </div>
                          )}
                          {activity.details.location && (
                            <div className="detail-item">
                              <span className="detail-label">Ubicación:</span>
                              <span className="detail-value">{activity.details.location}</span>
                            </div>
                          )}
                          {activity.details.device && (
                            <div className="detail-item">
                              <span className="detail-label">Dispositivo:</span>
                              <span className="detail-value">{activity.details.device}</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <div className="activity-timestamp">
                      {formatDate(activity.timestamp)}
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {/* Paginación */}
        {totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="pagination-btn"
            >
              ← Anterior
            </button>
            
            <div className="pagination-info">
              <span>Página {currentPage} de {totalPages}</span>
              <span className="pagination-count">
                ({startIndex + 1}-{Math.min(endIndex, filteredActivities.length)} de {filteredActivities.length})
              </span>
            </div>
            
            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="pagination-btn"
            >
              Siguiente →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActivityHistory;