import React, { useState, useEffect } from 'react';
import { useProducts } from '../context/ProductsContext';

export default function ProductForm() {
  const { addProduct, updateProduct, productToEdit, setProductToEdit } = useProducts();
  
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    description: '',
    image: 'https://i.pravatar.cc/150?img=3'
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // EFECTO MÁGICO: Si productToEdit cambia, rellenamos el formulario
  useEffect(() => {
    if (productToEdit) {
        setFormData({
            title: productToEdit.title,
            price: productToEdit.price,
            description: productToEdit.description,
            image: productToEdit.image
        });
    } else {
        // Si no hay nada para editar, limpiamos
        setFormData({ title: '', price: '', description: '', image: 'https://i.pravatar.cc/150?img=3' });
    }
  }, [productToEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validaciones básicas
    if (!formData.title.trim()) return setError("El nombre es obligatorio");
    if (parseFloat(formData.price) <= 0) return setError("Precio inválido");

    let exito = false;

    if (productToEdit) {
        // --- MODO EDICIÓN ---
        exito = await updateProduct(productToEdit.id, {
            ...formData, 
            price: parseFloat(formData.price)
        });
        if (exito) {
            setSuccess("¡Producto actualizado!");
            setProductToEdit(null); // Salimos del modo edición
        }
    } else {
        // --- MODO CREACIÓN ---
        exito = await addProduct({
            ...formData,
            price: parseFloat(formData.price),
            category: 'electronic'
        });
        if (exito) setSuccess("¡Producto creado!");
    }

    if (!exito) setError("Error en la operación");
    if (exito && !productToEdit) setFormData({ title: '', price: '', description: '', image: 'https://i.pravatar.cc/150?img=3' });
  };

  // Botón para cancelar edición
  const handleCancel = () => {
    setProductToEdit(null);
    setFormData({ title: '', price: '', description: '', image: 'https://i.pravatar.cc/150?img=3' });
  };

  return (
    <div style={{ background: '#fff', padding: '20px', margin: '20px auto', maxWidth: '400px', borderRadius: '8px', boxShadow: '0 2px 5px rgba(0,0,0,0.1)' }}>
      <h3>{productToEdit ? "Editar Producto" : "Agregar Nuevo Producto"}</h3>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" name="title" placeholder="Nombre" value={formData.title} onChange={handleChange} style={{ padding: '8px' }} />
        <input type="number" name="price" placeholder="Precio" value={formData.price} onChange={handleChange} style={{ padding: '8px' }} />
        <textarea name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} style={{ padding: '8px' }} />
        
        <button type="submit" style={{ padding: '10px', background: productToEdit ? '#ffa500' : '#27e46d', color: 'white', border: 'none', cursor: 'pointer' }}>
            {productToEdit ? "Actualizar Cambios" : "Guardar Producto"}
        </button>
        
        {productToEdit && (
            <button type="button" onClick={handleCancel} style={{ padding: '10px', background: '#ccc', border: 'none', cursor: 'pointer' }}>
                Cancelar Edición
            </button>
        )}
      </form>
    </div>
  );
}