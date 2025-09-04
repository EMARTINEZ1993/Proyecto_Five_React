import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { UserProvider } from './context/UserContext';
import Header from './components/Header';
import GoogleSheetIntegration from './components/GoogleSheetIntegration';
import AboutUs from './components/AboutUs';
import Formulario from './components/ContactForm'
import Footer from './components/Footer';
import Carrito from './components/Cart'
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import EditProfile from './components/EditProfile';
import UserPreferences from './components/UserPreferences';
import ActivityHistory from './components/ActivityHistory';
import ChangePassword from './components/ChangePassword';

import './App.css';

// Componente Home para la página principal
const Home = () => {
  return (
    <>
      <main className="products-section">
        <GoogleSheetIntegration />
      </main>
      <div className='contact-form-container'>
        <Formulario/>
      </div>
    </>
  );
};

// Componente temporal para páginas en desarrollo
const ComingSoon = ({ pageName }) => (
  <div style={{ 
    padding: '4rem 2rem', 
    textAlign: 'center', 
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <h2 style={{ color: '#8ba288', marginBottom: '1rem' }}>Próximamente</h2>
    <p style={{ color: '#666', fontSize: '1.1rem' }}>
      La página de {pageName} estará disponible pronto.
    </p>
  </div>
)

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <div className="app">
        <Header />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inicio" element={<Home />} />
          <Route path="/nosotros" element={<AboutUs />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/perfil" element={<Dashboard />} />
          <Route path="/perfil/editar" element={<EditProfile />} />
          <Route path="/perfil/preferencias" element={<UserPreferences />} />
          <Route path="/perfil/historial" element={<ActivityHistory />} />
          <Route path="/perfil/cambiar-password" element={<ChangePassword />} />
        </Routes>
        
          <Carrito/>
          <Footer />
        </div>
      </CartProvider>
    </UserProvider>
  );
}

export default App;