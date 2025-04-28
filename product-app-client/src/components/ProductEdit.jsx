import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct, updateProduct } from "../api/products";

function ProductEdit() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState(true);
  const [errors, setErrors] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch product data to pre-fill form
    const loadProduct = async () => {
      const res = await fetchProduct(id);
      const product = res.data;
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setAvailable(product.available);
    };

    loadProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Client-side validation
    let formErrors = {};
    if (!name) formErrors.name = "Product name is required.";
    if (!price || isNaN(price) || parseFloat(price) <= 0) formErrors.price = "Please provide a valid price.";

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    // Update product
    try {
      await updateProduct(id, { name, description, price, available });
      alert("Product updated successfully!");
      navigate("/products");
    } catch (error) {
      alert("There was an error updating the product.");
    }
  };

  return (
    <div>
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>

        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Price:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          {errors.price && <span className="error">{errors.price}</span>}
        </div>

        <div>
          <label>Availability:</label>
          <input
            type="checkbox"
            checked={available}
            onChange={() => setAvailable(!available)}
          />
        </div>

        <button type="submit">Update Product</button>
      </form>
    </div>
  );
}

export default ProductEdit;
