import React from 'react';
import { Link } from 'react-router-dom';


export default function ProductList({ products, addToCart }) {
return (
<section className="product-list">
{products.map((p) => (
<div key={p.id} className="product-card">
<img src={p.image} alt={p.title} />
<h3>{p.title}</h3>
<p>${p.price}</p>
<button onClick={() => addToCart(p)}>Agregar al carrito</button>
<Link to={`/product/${p.id}`}>Ver detalle</Link>
</div>
))}
</section>
);
}