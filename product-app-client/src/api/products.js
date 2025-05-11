import axios from "axios";

const API_URL = "/api/products";

// Fetch all products
export const fetchProducts = async () => {
  try {
    const response = await axios.get(API_URL);
    return response;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

// Fetch a single product by ID
export const fetchProduct = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response;
  } catch (error) {
    console.error("Error fetching product:", error);
  }
};

// Create a new product  <-- 🔥 ADD THIS
export const createProduct = async (data) => {
  try {
    const response = await axios.post(API_URL, data);
    return response;
  } catch (error) {
    console.error("Error creating product:", error);
  }
};

// Update a product by ID
export const updateProduct = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, data);
    return response;
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

// Delete a product by ID
export const deleteProduct = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error("Error deleting product:", error);
  }
};
