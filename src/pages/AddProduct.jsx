import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductsContext";
import { Container, Form, Button, Alert } from "react-bootstrap";

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
    <Container className="my-5" style={{ maxWidth: "600px" }}>
      <h1 className="mb-2">Add New Product</h1>
      <p className="text-muted mb-4">Create your own custom product listing</p>

      <Alert variant="info">
        <small>
          <strong>Note:</strong> Custom products are saved locally in your
          browser and will appear alongside API products in the Products page.
        </small>
      </Alert>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Name *</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price *</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="0.00"
            step="0.01"
            min="0"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Category *</Form.Label>
          <Form.Select
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
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL *</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
          {formData.image && (
            <div className="mt-3 text-center p-3 bg-light rounded">
              <img
                src={formData.image}
                alt="Preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Description *</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows={5}
            required
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" className="flex-fill">
            Add Product
          </Button>
          <Button
            variant="secondary"
            type="button"
            onClick={() => navigate("/products")}
            className="flex-fill"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Container>
  );
}

export default AddProduct;
