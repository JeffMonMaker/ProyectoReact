import React from 'react';
import { Link } from 'react-router-dom';


export default function NavBar() {
return (
<nav className="navbar">
<Link to="/">Inicio</Link>
<Link to="/cart">Carrito</Link>
<Link to="/perfil">Perfil</Link>
</nav>
);
}