import React, { createContext, useState, useEffect, useContext } from 'react';

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // NUEVO: Estado para saber qué producto se está editando
  const [productToEdit, setProductToEdit] = useState(null);

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

  const addProduct = async (newProduct) => {
    try {
      const res = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();
      setProducts((prev) => [...prev, { ...newProduct, id: data.id || Math.random() }]);
      return true;
    } catch (err) {
      console.error("Error creando:", err);
      return false;
    }
  };

  // NUEVO: Función para Actualizar (PUT)
  const updateProduct = async (id, updatedData) => {
    try {
        await fetch(`https://fakestoreapi.com/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
        });
        
        // Actualizamos el estado local buscando el ID y reemplazando los datos
        setProducts((prev) => prev.map(p => p.id === id ? { ...p, ...updatedData } : p));
        
        return true;
    } catch (err) {
        console.error("Error actualizando:", err);
        return false;
    }
  };

  const deleteProduct = async (id) => {
    try {
        await fetch(`https://fakestoreapi.com/products/${id}`, { method: 'DELETE' });
        setProducts((prev) => prev.filter(p => p.id !== id));
    } catch (err) {
        console.error("Error eliminando:", err);
    }
  };

  return (
    <ProductsContext.Provider value={{ 
        products, loading, error, 
        addProduct, deleteProduct, updateProduct, // Exportamos update
        productToEdit, setProductToEdit           // Exportamos el estado de edición
    }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);