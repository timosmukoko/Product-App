
const API_URL = "http://3.252.55.211/api/products";

export async function fetchProducts() {
  const response = await fetch(API_URL);
  return await response.json();
}

export async function createProduct(productData) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  return await response.json();
}

export async function updateProduct(productId, productData) {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(productData),
  });
  return await response.json();
}

export async function deleteProduct(productId) {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: "DELETE",
  });
  return response.ok;
}
