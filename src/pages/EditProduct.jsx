import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });

  useEffect(() => {
    // Fetch existing product data
    axios
      .get(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        setFormData({
          title: response.data.title,
          price: response.data.price,
          description: response.data.description,
          category: response.data.category,
          image: response.data.image,
        });
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load product data");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // PUT request to update product
    axios
      .put(`https://fakestoreapi.com/products/${id}`, formData)
      .then((response) => {
        console.log("Product updated:", response.data);
        setSuccess(true);
        setLoading(false);

        // Redirect after 2 seconds
        setTimeout(() => {
          navigate(`/product/${id}`);
        }, 2000);
      })
      .catch(() => {
        setError("Failed to update product. Please try again.");
        setLoading(false);
      });
  };

  if (loading && !formData.title) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading product data...</p>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="mb-4">Edit Product</h1>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success">
          Product updated successfully! Redirecting...
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter product title"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Price</Form.Label>
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
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelry</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="https://example.com/image.jpg"
            required
          />
          {formData.image && (
            <div className="mt-3 text-center">
              <img
                src={formData.image}
                alt="Preview"
                style={{
                  maxWidth: "200px",
                  maxHeight: "200px",
                  objectFit: "contain",
                }}
              />
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter product description"
            rows={4}
            required
          />
        </Form.Group>

        <div className="d-flex gap-2">
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </Button>
          <Button
            variant="secondary"
            onClick={() => navigate(`/product/${id}`)}
          >
            Cancel
          </Button>
        </div>
      </Form>

      <Alert variant="info" className="mt-4">
        <strong>Note:</strong> FakeStoreAPI will respond as if the update
        succeeded, but the changes will not persist if you refresh or fetch the
        data again. This is expected behavior for a mock API used in testing.
      </Alert>
    </Container>
  );
}

export default EditProduct;
