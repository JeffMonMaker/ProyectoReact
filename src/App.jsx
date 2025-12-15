import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './Components/Footer';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Cart from './components/Cart'; 
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';
import ProductForm from './Components/ProductForm'; // Importamos el formulario
import { useAuth } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';

export default function App() {
  const { isAuthenticated } = useAuth();

  // Componente para proteger rutas
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/login" />;
  };

  return (
    <div className="layout">
      <Header />
      <NavBar />
      <main>
        <Routes>
          {/* Ruta Inicio: Ya no pasamos props, ProductList se encarga solo */}
          <Route path="/" element={<ProductList />} />
          
          <Route path="/cart" element={<Cart />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={<Login />} />
          
          {/* Ruta Perfil Protegida: Aquí ponemos el formulario de crear productos */}
          <Route
            path="/perfil"
            element={
              <ProtectedRoute>
                <h2>Panel de Administración</h2>
                <p>Bienvenido, Admin.</p>
                {/* Aquí mostramos el formulario solo si está logueado */}
                <ProductForm /> 
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}