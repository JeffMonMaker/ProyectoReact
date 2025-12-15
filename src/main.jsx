import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Estilos de Bootstrap
import 'react-toastify/dist/ReactToastify.css'; // Estilos de las notificaciones
import { AuthProvider} from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { ProductsProvider } from './context/ProductsContext.jsx';


ReactDOM.createRoot(document.getElementById('root')).render(
<BrowserRouter>
    <AuthProvider>
        <CartProvider>
            <ProductsProvider>
                <App />
            </ProductsProvider>
        </CartProvider>
    </AuthProvider>
</BrowserRouter>
);