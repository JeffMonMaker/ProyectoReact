import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


export default function ProductDetail() {
const { id } = useParams();
const [product, setProduct] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);


useEffect(() => {
async function fetchProduct() {
try {
const res = await fetch(`https://fakestoreapi.com/products/${id}`);
if (!res.ok) throw new Error('Error al cargar producto');
const data = await res.json();
setProduct(data);
} catch (err) {
setError(err.message);
} finally {
setLoading(false);
}
}
fetchProduct();
}, [id]);


if (loading) return <p>Cargando producto...</p>;
if (error) return <p>{error}</p>;


return (
<section className="product-detail">
<h2>{product.title}</h2>
<img src={product.image} alt={product.title} />
<p>{product.description}</p>
<p><strong>${product.price}</strong></p>
</section>
);
}