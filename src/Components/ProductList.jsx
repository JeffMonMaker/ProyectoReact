import React, { useState } from 'react'; // <--- Importamos useState
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';      
import { useProducts } from '../context/ProductsContext'; 
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { FaShoppingCart, FaEye, FaEdit, FaTrash, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'; // Iconos nuevos

export default function ProductList() {
  const { products, loading, error, deleteProduct, setProductToEdit } = useProducts();
  const { addToCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // --- ESTADOS PARA BÚSQUEDA Y PAGINACIÓN ---
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Cuántos productos ver por página

  if (loading) return <div className="text-center mt-5"><div className="spinner-border text-primary" role="status"></div></div>;
  if (error) return <div className="alert alert-danger text-center">{error}</div>;

  // --- 1. LÓGICA DE BÚSQUEDA (FILTER) ---
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // --- 2. LÓGICA DE PAGINACIÓN (SLICE) ---
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  // Funciones auxiliares
  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success("🛒 Producto agregado al carrito!");
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        await deleteProduct(id);
        toast.error("🗑️ Producto eliminado");
    }
  };

  const handleEdit = (product) => {
    setProductToEdit(product); 
    navigate('/perfil');
  };

  // Resetear a página 1 cuando busco algo nuevo
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); 
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Nuestros Productos</h2>

      {/* --- BARRA DE BÚSQUEDA --- */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
            <div className="input-group">
                <span className="input-group-text bg-white"><FaSearch color="gray" /></span>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Buscar productos..." 
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>
        </div>
      </div>
      
      {/* --- GRILLA DE PRODUCTOS (Mostramos currentProducts) --- */}
      <div className="row">
        {currentProducts.length > 0 ? (
            currentProducts.map((p) => (
            <div key={p.id} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-4">
                <div className="card h-100 shadow-sm hover-shadow">
                <img 
                    src={p.image} 
                    className="card-img-top p-3" 
                    alt={p.title} 
                    style={{ height: '200px', objectFit: 'contain' }} 
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate" title={p.title}>{p.title}</h5>
                    <p className="card-text fw-bold text-success fs-5">${p.price}</p>
                    
                    <div className="mt-auto d-flex gap-2 justify-content-center flex-wrap">
                        <button onClick={() => handleAddToCart(p)} className="btn btn-primary btn-sm flex-grow-1">
                            <FaShoppingCart /> Agregar
                        </button>
                        <Link to={`/product/${p.id}`} className="btn btn-outline-secondary btn-sm">
                            <FaEye />
                        </Link>
                    </div>

                    {isAuthenticated && (
                        <div className="mt-3 pt-2 border-top d-flex gap-2 justify-content-center">
                            <button onClick={() => handleEdit(p)} className="btn btn-warning btn-sm text-white" title="Editar">
                                <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(p.id)} className="btn btn-danger btn-sm" title="Eliminar">
                                <FaTrash />
                            </button>
                        </div>
                    )}
                </div>
                </div>
            </div>
            ))
        ) : (
            <div className="text-center col-12">
                <p>No se encontraron productos que coincidan con tu búsqueda.</p>
            </div>
        )}
      </div>

      {/* --- PAGINACIÓN --- */}
      {totalPages > 1 && (
        <nav className="d-flex justify-content-center mt-4">
            <ul className="pagination">
                {/* Botón Anterior */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}>
                        <FaChevronLeft />
                    </button>
                </li>
                
                {/* Números de Página */}
                {[...Array(totalPages)].map((_, index) => (
                    <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                        <button className="page-link" onClick={() => setCurrentPage(index + 1)}>
                            {index + 1}
                        </button>
                    </li>
                ))}

                {/* Botón Siguiente */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button className="page-link" onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}>
                        <FaChevronRight />
                    </button>
                </li>
            </ul>
        </nav>
      )}
    </div>
  );
}