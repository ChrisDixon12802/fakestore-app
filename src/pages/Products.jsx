import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";

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
    return <div className="loading">Loading products...</div>;
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>All Products</h1>
        <button
          className="add-product-btn"
          onClick={() => navigate("/add-product")}
        >
          + Add Your Product
        </button>
      </div>

      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => setFilter("all")}
        >
          All Products
        </button>
        <button
          className={filter === "electronics" ? "active" : ""}
          onClick={() => setFilter("electronics")}
        >
          Electronics
        </button>
        <button
          className={filter === "jewelery" ? "active" : ""}
          onClick={() => setFilter("jewelery")}
        >
          Jewelry
        </button>
        <button
          className={filter === "men's clothing" ? "active" : ""}
          onClick={() => setFilter("men's clothing")}
        >
          Men's Clothing
        </button>
        <button
          className={filter === "women's clothing" ? "active" : ""}
          onClick={() => setFilter("women's clothing")}
        >
          Women's Clothing
        </button>
      </div>

      <div className="products-grid">
        {allProducts.map((product) => (
          <div
            key={product.id}
            className="product-card"
            onClick={() => navigate(`/product/${product.id}`)}
          >
            {product.isCustom && (
              <span className="custom-badge">Your Product</span>
            )}
            <img
              src={product.image}
              alt={product.title}
              className="product-image-real"
            />
            <h3>{product.title}</h3>
            <p className="product-category">{product.category}</p>
            <div className="product-rating">
              ⭐ {product.rating.rate} ({product.rating.count} reviews)
            </div>
            <p className="product-price">${product.price}</p>
            <div className="product-actions">
              <button
                className="add-to-cart"
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add to Cart
              </button>
              {product.isCustom && (
                <button
                  className="delete-product-btn"
                  onClick={(e) => handleDelete(e, product.id)}
                  title="Delete Product"
                >
                  🗑️
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
