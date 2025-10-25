import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './Components/Footer';
import NavBar from './components/NavBar';
import ProductList from './components/ProductList';
import Cart from '../src/Components/Cart'; 
import ProductDetail from './components/ProductDetail';
import Login from './components/Login';


export default function App() {
const [cart, setCart] = useState([]);
const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [isAuthenticated, setIsAuthenticated] = useState(false);


useEffect(() => {
async function fetchProducts() {
try {
const res = await fetch('https://fakestoreapi.com/products');
if (!res.ok) throw new Error('Error al cargar productos');
const data = await res.json();
setProducts(data);
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
}
fetchProducts();
}, []);


const addToCart = (product) => {
setCart((prev) => [...prev, product]);
};


const ProtectedRoute = ({ children }) => {
return isAuthenticated ? children : <Navigate to="/login" />;
};


return (
<div className="layout">
<Header />
<NavBar />
<main>
<Routes>
<Route
path="/"
element={
loading ? (
<p>Cargando productos...</p>
) : error ? (
<p>Error al cargar productos. Inténtalo más tarde.</p>
) : (
<ProductList products={products} addToCart={addToCart} />
)
}
/>
<Route path="/cart" element={<Cart cart={cart} />} />
<Route path="/product/:id" element={<ProductDetail />} />
<Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
<Route
path="/perfil"
element={
<ProtectedRoute>
<h2>Bienvenido al área protegida del usuario</h2>
</ProtectedRoute>
}
/>
</Routes>
</main>
<Footer />
</div>
);
}