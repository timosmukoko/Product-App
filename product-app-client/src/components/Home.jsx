import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../api/products';
import '../Home.css';  // Import the custom CSS for styling cards

const Home = () => {
  const [products, setProducts] = useState([]);

  // Fetch the products when the component mounts
  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    const res = await fetchProducts();
    setProducts(res.data);
  };

  return (
    <div className="home-container">
      <h1>Welcome to Our Store</h1>
      <div className="product-cards-container">
        {products.map((product) => (
          <div className={`product-card ${!product.available ? 'out-of-stock' : ''}`} key={product.id}>
            <img src={product.image_url || '/default-product-image.jpg'} alt={product.name} />
            <div className="product-card-details">
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>${product.price}</strong></p>
              <p className={product.available ? 'available' : 'out-of-stock'}>
                {product.available ? 'Available' : 'Out of Stock'}
              </p>
              <Link to={`/products/${product.id}`} className="view-details-btn">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
