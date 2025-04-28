import React, { useState } from 'react';
import { createProduct } from '../api/products';
import { useNavigate } from 'react-router-dom';
import '../ProductCreate.css'; // Import the custom CSS for styling

const ProductCreate = () => {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    available: true,
  });
  const navigate = useNavigate();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProduct({
      ...product,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createProduct(product);
    if (response.status === 201) {
      navigate('/'); // Redirect to home page after successful product creation
    }
  };

  return (
    <div className="product-create-container">
      <h1>Create a New Product</h1>
      <form onSubmit={handleSubmit} className="product-create-form">
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
            required
            min="0.01"
            step="0.01"
          />
        </div>

        <div className="form-group checkbox-group">
          <label htmlFor="available">Available</label>
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={product.available}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-btn">Create Product</button>
      </form>
    </div>
  );
};

export default ProductCreate;
