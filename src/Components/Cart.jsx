import React from 'react';
export default function Cart({ cart }) {
return (
<section className="cart">
<h2>🛒 Carrito de compras</h2>
{cart.length === 0 ? (
<p>El carrito está vacío</p>
) : (
<ul>
{cart.map((item, index) => (
<li key={index}>
    {item.title} - ${item.price}
    <button onClick={() => removeFromCart(index)}>❌ Quitar</button></li>
))}
</ul>
)}
</section>
);
}