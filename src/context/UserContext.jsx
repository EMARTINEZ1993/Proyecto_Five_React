import React, { createContext, useContext, useState, useEffect } from 'react';

// Crear el contexto
const UserContext = createContext();

// Base de datos simulada de usuarios
const USERS_STORAGE_KEY = 'registeredUsers';
const CURRENT_USER_KEY = 'currentUser';

// Usuarios por defecto para pruebas
const defaultUsers = [
  {
    id: 1,
    email: 'admin@organi.live',
    password: '123456',
    firstName: 'Admin',
    lastName: 'Sistema',
    phone: '+57 300 000 0000',
    fechaRegistro: '2023-01-01T00:00:00Z',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  },
  {
    id: 2,
    email: 'usuario@test.com',
    password: 'password123',
    firstName: 'Usuario',
    lastName: 'Prueba',
    phone: '+57 300 111 1111',
    fechaRegistro: '2023-06-15T10:30:00Z',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
  }
];

// Hook personalizado para usar el contexto
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState([]);

  // Inicializar usuarios y cargar usuario actual
  useEffect(() => {
    // Cargar usuarios registrados
    const savedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    if (savedUsers) {
      try {
        setRegisteredUsers(JSON.parse(savedUsers));
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
        setRegisteredUsers(defaultUsers);
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
      }
    } else {
      setRegisteredUsers(defaultUsers);
      localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(defaultUsers));
    }

    // Cargar usuario actual
    const savedUser = localStorage.getItem(CURRENT_USER_KEY);
    if (savedUser) {
      try {
        const userData = JSON.parse(savedUser);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error al cargar usuario actual:', error);
        localStorage.removeItem(CURRENT_USER_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  // Función para registrar nuevo usuario
  const register = (userData) => {
    const newUser = {
      id: Date.now(),
      ...userData,
      fechaRegistro: new Date().toISOString()
    };
    
    const updatedUsers = [...registeredUsers, newUser];
    setRegisteredUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
    
    return newUser;
  };

  // Función para validar credenciales
  const validateCredentials = (email, password) => {
    return registeredUsers.find(user => 
      user.email === email && user.password === password
    );
  };

  // Función para hacer login con validación
  const login = (email, password) => {
    const foundUser = validateCredentials(email, password);
    
    if (foundUser) {
      // Crear objeto de usuario sin la contraseña
      const { password: _, ...userWithoutPassword } = foundUser;
      const userWithDefaults = {
        ...userWithoutPassword,
        nombre: userWithoutPassword.firstName || 'Usuario',
        apellido: userWithoutPassword.lastName || 'Demo',
        telefono: userWithoutPassword.phone || '+57 300 123 4567',
        avatar: userWithoutPassword.avatar || null,
        ultimoAcceso: new Date().toISOString(),
        estadisticas: userWithoutPassword.estadisticas || {
          pedidosRealizados: 12,
          productosComprados: 45,
          ahorroTotal: 125000,
          puntosAcumulados: 850
        },
        preferencias: userWithoutPassword.preferencias || {
          notificaciones: {
            email: true,
            push: true,
            sms: false
          },
          idioma: 'es',
          region: 'CO',
          tema: 'light',
          privacidad: {
            perfilPublico: false,
            compartirDatos: false
          }
        }
      };
      
      setUser(userWithDefaults);
      setIsAuthenticated(true);
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(userWithDefaults));
      return { success: true, user: userWithDefaults };
    } else {
      return { success: false, error: 'Credenciales incorrectas' };
    }
  };

  // Función para hacer logout
  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem(CURRENT_USER_KEY);
  };

  // Función para actualizar datos del usuario
  const updateUser = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
    
    // También actualizar en la lista de usuarios registrados
    const updatedUsers = registeredUsers.map(u => 
      u.id === user.id ? { ...u, ...updatedData } : u
    );
    setRegisteredUsers(updatedUsers);
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(updatedUsers));
  };

  // Función para actualizar preferencias
  const updatePreferences = (newPreferences) => {
    const updatedUser = {
      ...user,
      preferencias: { ...user.preferencias, ...newPreferences }
    };
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  };

  // Función para agregar actividad al historial
  const addActivity = (activity) => {
    const newActivity = {
      id: Date.now(),
      fecha: new Date().toISOString(),
      ...activity
    };
    
    const updatedUser = {
      ...user,
      historialActividad: [newActivity, ...(user.historialActividad || [])]
    };
    
    setUser(updatedUser);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated,
    isLoading,
    registeredUsers,
    login,
    logout,
    register,
    validateCredentials,
    updateUser,
    updatePreferences,
    addActivity
  };

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;