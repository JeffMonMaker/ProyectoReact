import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // <--- Importamos Helmet

export default function ProductDetail() {
  // ... (tu lógica de fetch o contexto igual que antes) ...
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // NOTA: Podrías usar useContext aquí también si quisieras optimizar,
  // pero mantendremos tu fetch individual por ahora para no cambiar tanto código.
  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => {
          setProduct(data);
          setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-5">Cargando...</div>;
  if (!product) return <div>Producto no encontrado</div>;

  return (
    <section className="container mt-5">
      {/* SEO DINÁMICO */}
      <Helmet>
        <title>{product.title} | Mi Tienda</title>
        <meta name="description" content={`Compra ${product.title} al mejor precio.`} />
      </Helmet>

      <div className="row">
        <div className="col-md-6 text-center">
            <img src={product.image} alt={product.title} className="img-fluid" style={{maxHeight: '400px'}} />
        </div>
        <div className="col-md-6">
            <h2>{product.title}</h2>
            <p className="lead text-muted">{product.description}</p>
            <h3 className="text-success my-4">${product.price}</h3>
            <button className="btn btn-primary btn-lg">Comprar ahora</button>
        </div>
      </div>
    </section>
  );
}
