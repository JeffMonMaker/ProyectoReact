import React from 'react';
import { useCart } from '../context/CartContext'; // Importamos hook

export default function Cart() {
  // Obtenemos todo lo necesario del contexto
  const { cart, removeFromCart, total, clearCart } = useCart();

  return (
    <section className="cart">
      <h2>🛒 Carrito de compras</h2>
      {cart.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index} style={{ listStyle: 'none', margin: '10px 0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '400px', margin: '0 auto' }}>
                    <span>{item.title.substring(0, 20)}... - <strong>${item.price}</strong></span>
                    <button onClick={() => removeFromCart(index)} style={{ marginLeft: '10px', background: 'red', color: 'white' }}>
                        ❌
                    </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <button onClick={clearCart} style={{ marginTop: '20px' }}>Vaciar Carrito</button>
        </>
      )}
    </section>
  );
}