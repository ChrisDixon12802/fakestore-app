import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Button,
  Badge,
  Spinner,
  Alert,
  Modal,
} from "react-bootstrap";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { customProducts } = useProducts();
  const [apiProduct, setApiProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  // Check if this is a custom product
  const isCustomProduct = id?.startsWith("custom-");

  // Get custom product from context
  const customProduct = useMemo(() => {
    if (isCustomProduct) {
      return customProducts.find((p) => p.id === id);
    }
    return null;
  }, [id, customProducts, isCustomProduct]);

  // Fetch API product if not custom
  useEffect(() => {
    if (!isCustomProduct && id) {
      let cancelled = false;

      axios
        .get(`https://fakestoreapi.com/products/${id}`)
        .then((response) => {
          if (!cancelled) {
            setApiProduct(response.data);
          }
        })
        .catch((error) => {
          if (!cancelled) {
            console.error("Error fetching product:", error);
            setApiProduct(undefined); // Use undefined to indicate error
          }
        });

      return () => {
        cancelled = true;
      };
    }
  }, [id, isCustomProduct]);

  // Determine which product to display
  const product = isCustomProduct ? customProduct : apiProduct;

  // Loading state
  const loading = !isCustomProduct && !apiProduct && apiProduct !== undefined;

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    }
  };

  const handleDelete = () => {
    setDeleting(true);
    setError("");

    // DELETE request to FakeStoreAPI
    axios
      .delete(`https://fakestoreapi.com/products/${id}`)
      .then((response) => {
        console.log("Product deleted:", response.data);
        setShowDeleteModal(false);
        // Redirect to products page
        navigate("/products");
      })
      .catch(() => {
        setError("Failed to delete product. Please try again.");
        setDeleting(false);
      });
  };

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading product...</p>
      </Container>
    );
  }

  if (!product) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Product Not Found</Alert.Heading>
          <p>The product you're looking for doesn't exist.</p>
          <Button variant="primary" onClick={() => navigate("/products")}>
            Back to Products
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="my-5">
      <Button variant="secondary" onClick={() => navigate(-1)} className="mb-4">
        ← Back to Products
      </Button>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={6} className="mb-4">
          <div className="text-center bg-light p-4 rounded">
            <img
              src={product.image}
              alt={product.title}
              style={{
                maxWidth: "100%",
                maxHeight: "400px",
                objectFit: "contain",
              }}
            />
          </div>
        </Col>

        <Col md={6}>
          <Badge bg="info" className="mb-2">
            {product.category}
          </Badge>
          <h1 className="mb-3">{product.title}</h1>

          <div className="mb-3">
            <span className="text-warning">⭐ {product.rating.rate}</span>
            <span className="text-muted ms-2">
              ({product.rating.count} reviews)
            </span>
          </div>

          <h2 className="text-primary mb-3">${product.price}</h2>

          <p className="mb-4">{product.description}</p>

          <div className="mb-4">
            <label className="me-3">Quantity:</label>
            <div className="d-inline-flex border rounded">
              <Button
                variant="light"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </Button>
              <span className="px-3 py-1">{quantity}</span>
              <Button
                variant="light"
                size="sm"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </Button>
            </div>
          </div>

          <div className="d-grid gap-2 mb-4">
            <Button
              variant={addedToCart ? "success" : "primary"}
              size="lg"
              onClick={handleAddToCart}
            >
              {addedToCart ? "✓ Added to Cart!" : "🛒 Add to Cart"}
            </Button>

            <div className="d-flex gap-2">
              <Button
                variant="warning"
                className="flex-fill"
                onClick={() => navigate(`/edit-product/${id}`)}
              >
                ✏️ Edit Product
              </Button>
              <Button
                variant="danger"
                className="flex-fill"
                onClick={() => setShowDeleteModal(true)}
              >
                🗑️ Delete Product
              </Button>
            </div>
          </div>

          <Alert variant="info">
            <div className="d-flex align-items-start">
              <span className="me-3 fs-4">🚚</span>
              <div>
                <strong>Free Shipping</strong>
                <p className="mb-0 small">On orders over $50</p>
              </div>
            </div>
          </Alert>

          <Alert variant="info">
            <div className="d-flex align-items-start">
              <span className="me-3 fs-4">↩️</span>
              <div>
                <strong>Easy Returns</strong>
                <p className="mb-0 small">30-day return policy</p>
              </div>
            </div>
          </Alert>

          <Alert variant="info">
            <div className="d-flex align-items-start">
              <span className="me-3 fs-4">🔒</span>
              <div>
                <strong>Secure Payment</strong>
                <p className="mb-0 small">100% secure checkout</p>
              </div>
            </div>
          </Alert>
        </Col>
      </Row>

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <strong>{product.title}</strong>?
          <Alert variant="warning" className="mt-3 mb-0">
            <small>
              <strong>Note:</strong> FakeStoreAPI will return a success
              response, but the product will not actually be removed from the
              API. This is expected behavior for a mock testing API.
            </small>
          </Alert>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeleteModal(false)}
            disabled={deleting}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete} disabled={deleting}>
            {deleting ? "Deleting..." : "Delete Product"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ProductDetail;
