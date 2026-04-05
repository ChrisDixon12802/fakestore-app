import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

  if (loading) {
    return <div className="loading">Loading product...</div>;
  }

  if (!product) {
    return <div className="loading">Product not found</div>;
  }

  return (
    <div className="product-detail">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back to Products
      </button>

      <div className="product-detail-container">
        <div className="product-detail-image">
          <img src={product.image} alt={product.title} />
        </div>

        <div className="product-detail-info">
          <span className="product-category">{product.category}</span>
          <h1>{product.title}</h1>

          <div className="product-rating-large">
            <span className="stars">⭐ {product.rating.rate}</span>
            <span className="reviews">({product.rating.count} reviews)</span>
          </div>

          <p className="product-price-large">${product.price}</p>

          <p className="product-description">{product.description}</p>

          <div className="quantity-selector">
            <label>Quantity:</label>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                -
              </button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <button
            className={`add-to-cart-large ${addedToCart ? "added" : ""}`}
            onClick={handleAddToCart}
          >
            {addedToCart ? "✓ Added to Cart!" : "🛒 Add to Cart"}
          </button>

          <div className="product-features">
            <div className="feature-item">
              <span>🚚</span>
              <div>
                <strong>Free Shipping</strong>
                <p>On orders over $50</p>
              </div>
            </div>
            <div className="feature-item">
              <span>↩️</span>
              <div>
                <strong>Easy Returns</strong>
                <p>30-day return policy</p>
              </div>
            </div>
            <div className="feature-item">
              <span>🔒</span>
              <div>
                <strong>Secure Payment</strong>
                <p>100% secure checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
