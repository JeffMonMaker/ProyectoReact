import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Crear el contexto
const AuthContext = createContext();

// 2. Crear el proveedor
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Al cargar la app, revisamos si ya había una sesión guardada
  useEffect(() => {
    const storedUser = localStorage.getItem('user_token');
    if (storedUser) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === '1234') {
      localStorage.setItem('user_token', 'token_simulado_123'); // Guardamos token
      setIsAuthenticated(true);
      return true; // Login exitoso
    }
    return false; // Login fallido
  };

  const logout = () => {
    localStorage.removeItem('user_token'); // Borramos token
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Hook personalizado para usarlo fácil
export const useAuth = () => useContext(AuthContext);