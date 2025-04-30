const API_URL = "http://3.252.55.211/api/products";  // Your Rails API endpoint

// Fetch and display all products (for Product List Page)
async function fetchProducts() {
  const response = await fetch(API_URL);
  const products = await response.json();
  const productList = document.getElementById("product-list");
  productList.innerHTML = ''; // Clear existing list

  products.forEach(product => {
    const productItem = document.createElement("div");
    productItem.classList.add("product-item");

    // Format the price as a number with 2 decimal places
    const priceFormatted = parseFloat(product.price).toFixed(2);

    productItem.innerHTML = `
      <div>
        <strong>${product.name}</strong><br>
        ${product.description}<br>
        $${priceFormatted}<br>
        <small>Available: ${product.available ? '✅' : '❌'}</small>
      </div>
      <div>
        <button class="edit" onclick="editProduct(${product.id})">Edit</button>
        <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
      </div>
    `;
    productList.appendChild(productItem);
  });
}

// Show the edit form with pre-filled data for the selected product
function editProduct(productId) {
  getProductById(productId).then(product => {
    if (product) {
      document.getElementById("edit-product-name").value = product.name;
      document.getElementById("edit-product-description").value = product.description;
      document.getElementById("edit-product-price").value = product.price;
      document.getElementById("edit-product-available").checked = product.available;

      const saveButton = document.getElementById("save-changes");
      saveButton.onclick = () => updateProduct(productId);

      document.getElementById("edit-form").style.display = "block";
    }
  });
}

// Cancel editing
document.getElementById("cancel-edit").onclick = () => {
  document.getElementById("edit-form").style.display = "none";
}

// Fetch the product by ID
async function getProductById(id) {
  const response = await fetch(`${API_URL}/${id}`);
  return response.json();
}

// Update the product (for editing products)
async function updateProduct(productId) {
  const name = document.getElementById("edit-product-name").value;
  const description = document.getElementById("edit-product-description").value;
  const price = document.getElementById("edit-product-price").value;
  const available = document.getElementById("edit-product-available").checked;

  const productData = { name, description, price, available };

  const response = await fetch(`${API_URL}/${productId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (response.ok) {
    alert("Product updated successfully!");
    fetchProducts(); // Refresh the product list
    document.getElementById("edit-form").style.display = "none";
  } else {
    alert("Error updating product.");
  }
}

// Delete the product
async function deleteProduct(productId) {
  const response = await fetch(`${API_URL}/${productId}`, {
    method: "DELETE",
  });

  if (response.ok) {
    alert("Product deleted successfully!");
    fetchProducts(); // Refresh the product list
  } else {
    alert("Error deleting product.");
  }
}

// Create a new product (for ProductCreate Page)
async function createProduct() {
  const name = document.getElementById("product-name").value;
  const description = document.getElementById("product-description").value;
  const price = document.getElementById("product-price").value;
  const available = document.getElementById("product-available").checked;

  const productData = { name, description, price, available };

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productData),
  });

  if (response.ok) {
    alert("Product created successfully!");
    window.location.href = "Products.html"; // Redirect to the Product List Page
  } else {
    alert("Error creating product.");
  }
}

// Initialize the product list (for Products Page)
if (document.getElementById("product-list")) {
  fetchProducts();
}

// Initialize the create product form (for ProductCreate Page)
if (document.getElementById("create-product-form")) {
  document.getElementById("create-product-form").onsubmit = (e) => {
    e.preventDefault();
    createProduct();
  };
}
