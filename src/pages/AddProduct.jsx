import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";

function AddProduct() {
  const navigate = useNavigate();
  const { addProduct } = useProducts();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "electronics",
    image: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert price to number
    const productData = {
      ...formData,
      price: parseFloat(formData.price),
    };

    addProduct(productData);

    // Show success message and redirect
    alert("Product added successfully!");
    navigate("/products");
  };

  return (
    <div className="add-product-page">
      <div className="add-product-container">
        <h1>Add New Product</h1>
        <p className="subtitle">Create your own custom product listing</p>

        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label>Product Name *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="form-group">
            <label>Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="electronics">Electronics</option>
              <option value="jewelery">Jewelry</option>
              <option value="men's clothing">Men's Clothing</option>
              <option value="women's clothing">Women's Clothing</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Image URL *</label>
            <input
              type="url"
              name="image"
              value={formData.image}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              required
            />
            {formData.image && (
              <div className="image-preview">
                <img src={formData.image} alt="Preview" />
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter product description"
              rows="5"
              required
            />
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button">
              Add Product
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/products")}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;
