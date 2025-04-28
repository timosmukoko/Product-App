import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchProduct } from "../api/products";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    const res = await fetchProduct(id);
    setProduct(res.data);
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <p>Available: {product.available ? "Yes" : "No"}</p>
    </div>
  );
}

export default ProductDetail;
