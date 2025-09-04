import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  
  const getActiveMenu = () => {
    const path = location.pathname;
    if (path === '/' || path === '/inicio') return 'inicio';
    if (path === '/nosotros') return 'nosotros';
    if (path === '/registro') return 'registro';
    if (path === '/login') return 'login';
    return 'inicio';
  };

  return (
    <header className="app-header">
      <div className="header-content">
        <h1 className="header-title">🌱 Organi.Live</h1>
        <nav className="main-nav">
          <ul className="nav-menu">
            <li className="nav-item">
              <Link 
                to="/inicio" 
                className={`nav-link ${getActiveMenu() === 'inicio' ? 'active' : ''}`}
              >
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/nosotros" 
                className={`nav-link ${getActiveMenu() === 'nosotros' ? 'active' : ''}`}
              >
                Nosotros
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/registro" 
                className={`nav-link ${getActiveMenu() === 'registro' ? 'active' : ''}`}
              >
                Registro
              </Link>
            </li>
            <li className="nav-item">
              <Link 
                to="/login" 
                className={`nav-link ${getActiveMenu() === 'login' ? 'active' : ''}`}
              >
                Iniciar Sesión
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;