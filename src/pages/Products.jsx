import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  ButtonGroup,
  Badge,
} from "react-bootstrap";

function Products() {
  const [apiProducts, setApiProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const { addToCart } = useCart();
  const { customProducts, deleteProduct } = useProducts();
  const navigate = useNavigate();

  useEffect(() => {
    const url =
      filter === "all"
        ? "https://fakestoreapi.com/products"
        : `https://fakestoreapi.com/products/category/${filter}`;

    axios
      .get(url)
      .then((response) => {
        setApiProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, [filter]);

  // Combine API products with custom products
  const filteredCustomProducts =
    filter === "all"
      ? customProducts
      : customProducts.filter((p) => p.category === filter);

  const allProducts = [...apiProducts, ...filteredCustomProducts];

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleDelete = (e, productId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this product?")) {
      deleteProduct(productId);
    }
  };

  if (loading) {
    return (
      <Container className="text-center my-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-3">Loading products...</p>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>All Products</h1>
        <Button variant="success" onClick={() => navigate("/add-product")}>
          + Add Your Product
        </Button>
      </div>

      <ButtonGroup className="mb-4 d-flex flex-wrap">
        <Button
          variant={filter === "all" ? "primary" : "outline-primary"}
          onClick={() => setFilter("all")}
        >
          All Products
        </Button>
        <Button
          variant={filter === "electronics" ? "primary" : "outline-primary"}
          onClick={() => setFilter("electronics")}
        >
          Electronics
        </Button>
        <Button
          variant={filter === "jewelery" ? "primary" : "outline-primary"}
          onClick={() => setFilter("jewelery")}
        >
          Jewelry
        </Button>
        <Button
          variant={filter === "men's clothing" ? "primary" : "outline-primary"}
          onClick={() => setFilter("men's clothing")}
        >
          Men's Clothing
        </Button>
        <Button
          variant={
            filter === "women's clothing" ? "primary" : "outline-primary"
          }
          onClick={() => setFilter("women's clothing")}
        >
          Women's Clothing
        </Button>
      </ButtonGroup>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {allProducts.map((product) => (
          <Col key={product.id}>
            <Card
              className="h-100 product-card-hover"
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              {product.isCustom && (
                <Badge
                  bg="success"
                  className="position-absolute top-0 end-0 m-2"
                >
                  Your Product
                </Badge>
              )}
              <Card.Img
                variant="top"
                src={product.image}
                alt={product.title}
                style={{
                  height: "200px",
                  objectFit: "contain",
                  padding: "1rem",
                  backgroundColor: "#f8f9fa",
                }}
              />
              <Card.Body className="d-flex flex-column">
                <Card.Title
                  style={{
                    fontSize: "0.95rem",
                    height: "3rem",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                  }}
                >
                  {product.title}
                </Card.Title>
                <Card.Text className="text-muted small">
                  {product.category}
                </Card.Text>
                <Card.Text className="small">
                  ⭐ {product.rating.rate} ({product.rating.count} reviews)
                </Card.Text>
                <Card.Text className="fw-bold text-primary fs-5">
                  ${product.price}
                </Card.Text>
                <div className="mt-auto">
                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      className="flex-fill"
                      onClick={(e) => handleAddToCart(e, product)}
                    >
                      Add to Cart
                    </Button>
                    {product.isCustom && (
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={(e) => handleDelete(e, product.id)}
                        title="Delete Product"
                      >
                        🗑️
                      </Button>
                    )}
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Products;
