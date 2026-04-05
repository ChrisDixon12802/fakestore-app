import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Modal, Button, Row, Col, Card } from "react-bootstrap";

function Home() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);
  const navigate = useNavigate();

  const handleShopNow = () => {
    setShowWelcomeModal(false);
    navigate("/products");
  };

  return (
    <>
      {/* Welcome Modal */}
      <Modal
        show={showWelcomeModal}
        onHide={() => setShowWelcomeModal(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Welcome to NEXORA</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="fs-5 text-center mb-3">
            Your Premium Online Shopping Destination
          </p>
          <p className="text-center mb-4">
            Discover an exclusive collection of quality products curated just
            for you. From fashion to electronics, find everything you need in
            one place.
          </p>
          <Row className="text-center">
            <Col md={4}>
              <div className="p-3">
                <span className="fs-1">🚚</span>
                <p className="mb-0">
                  <strong>Free Shipping</strong>
                </p>
                <small className="text-muted">On orders over $50</small>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3">
                <span className="fs-1">🔒</span>
                <p className="mb-0">
                  <strong>Secure Checkout</strong>
                </p>
                <small className="text-muted">100% protected</small>
              </div>
            </Col>
            <Col md={4}>
              <div className="p-3">
                <span className="fs-1">⭐</span>
                <p className="mb-0">
                  <strong>Top Quality</strong>
                </p>
                <small className="text-muted">Premium products</small>
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button variant="primary" size="lg" onClick={handleShopNow}>
            Shop Now
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Main Home Content */}
      <Container className="my-5">
        <div className="text-center py-5">
          <h1 className="display-3 mb-3">Welcome to NEXORA</h1>
          <p className="lead mb-4">Your Premium Online Shopping Destination</p>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate("/products")}
          >
            Browse Products
          </Button>
        </div>

        {/* Categories Section */}
        <h2 className="text-center mb-4 mt-5">Shop by Category</h2>
        <Row className="g-4 mb-5">
          <Col md={3} sm={6}>
            <Card
              className="text-center h-100 category-card-hover"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/products")}
            >
              <Card.Body>
                <div className="fs-1 mb-3">👔</div>
                <Card.Title>Men's Fashion</Card.Title>
                <Card.Text className="text-muted">Trending styles</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card
              className="text-center h-100 category-card-hover"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/products")}
            >
              <Card.Body>
                <div className="fs-1 mb-3">👗</div>
                <Card.Title>Women's Fashion</Card.Title>
                <Card.Text className="text-muted">Latest collections</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card
              className="text-center h-100 category-card-hover"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/products")}
            >
              <Card.Body>
                <div className="fs-1 mb-3">💎</div>
                <Card.Title>Jewelry</Card.Title>
                <Card.Text className="text-muted">Elegant pieces</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={3} sm={6}>
            <Card
              className="text-center h-100 category-card-hover"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/products")}
            >
              <Card.Body>
                <div className="fs-1 mb-3">💻</div>
                <Card.Title>Electronics</Card.Title>
                <Card.Text className="text-muted">Tech essentials</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Call to Action */}
        <Card bg="primary" text="white" className="text-center my-5">
          <Card.Body className="py-5">
            <h2 className="mb-3">Limited Time Offer!</h2>
            <p className="fs-5 mb-4">Get up to 50% off on selected items</p>
            <Button
              variant="light"
              size="lg"
              onClick={() => navigate("/deals")}
            >
              Shop Deals
            </Button>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}

export default Home;
