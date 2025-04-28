import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-brand">
          Product Store
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/products" className="navbar-link">Manage Products</Link>
          <Link to="/products/new" className="navbar-link">Add Product</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
