import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchProducts, deleteProduct } from "../api/products";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [availabilityFilter, setAvailabilityFilter] = useState("all");

  // Load the product list on component mount
  useEffect(() => {
    loadProducts();
  }, []);

  // Fetch all products
  const loadProducts = async () => {
    const res = await fetchProducts();
    setProducts(res.data);
    setFilteredProducts(res.data);
  };

  // Handle delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      await deleteProduct(id);
      loadProducts(); // Reload the product list after deletion
    }
  };

  // Filter products based on availability
  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    setAvailabilityFilter(filterValue);

    if (filterValue === "available") {
      setFilteredProducts(products.filter((product) => product.available));
    } else if (filterValue === "unavailable") {
      setFilteredProducts(products.filter((product) => !product.available));
    } else {
      setFilteredProducts(products); // Show all products
    }
  };

  return (
    <div className="product-list-container">
      <h1>Products</h1>

      {/* Filter by availability */}
      <div>
        <label>Filter by Availability: </label>
        <select
          value={availabilityFilter}
          onChange={handleFilterChange}
        >
          <option value="all">All</option>
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </div>

      {/* Product List */}
      <ul className="product-list">
        {filteredProducts.map((product) => (
          <li key={product.id} className="product-item">
            <strong>{product.name}</strong> - ${product.price}
            <div>Availability: {product.available ? "Available" : "Unavailable"}</div>

            <div>
              <Link to={`/products/${product.id}`} className="view-link">View Details</Link>
              <span> | </span>
              <Link to={`/products/${product.id}/edit`} className="edit-link">Edit</Link>
              <span> | </span>
              <button onClick={() => handleDelete(product.id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductList;
