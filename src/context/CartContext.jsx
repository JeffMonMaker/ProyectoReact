import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Agregar producto
  const addToCart = (product) => {
    // Podrías agregar lógica aquí para no duplicar items, pero por ahora simple:
    setCart((prev) => [...prev, product]);
    // Opcional: Agregar Toastify aquí más adelante
  };

  // Eliminar producto (por índice o ID)
  const removeFromCart = (indexToRemove) => {
    setCart((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  // Vaciar carrito
  const clearCart = () => {
    setCart([]);
  };

  // Calcular total (extra útil)
  const total = cart.reduce((acc, item) => acc + item.price, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, total }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);