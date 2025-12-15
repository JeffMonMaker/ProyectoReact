import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos el contexto

export default function NavBar() {
  const { isAuthenticated, logout } = useAuth(); // Traemos el estado y la función salir
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();      // 1. Borra el token y el estado
    navigate('/'); // 2. Te redirige al Inicio
  };

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>
      <Link to="/cart">Carrito</Link>

      {/* RENDERIZADO CONDICIONAL */}
      {isAuthenticated ? (
        <>
          {/* Si es Admin, ve el link al Perfil y el botón de Salir */}
          <Link to="/perfil">Admin Panel</Link>
          <button 
            onClick={handleLogout} 
            style={{
                background: 'transparent', 
                border: '1px solid white', 
                color: 'white', 
                padding: '5px 10px', 
                borderRadius: '5px', 
                cursor: 'pointer',
                marginLeft: '10px'
            }}
          >
            Salir 🚪
          </button>
        </>
      ) : (
        /* Si NO es Admin, ve el link al Login */
        <Link to="/login">Login 👤</Link>
      )}
    </nav>
  );
}