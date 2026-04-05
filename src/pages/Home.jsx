import { useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [showWelcomeModal, setShowWelcomeModal] = useState(true);

  const handleShopNow = () => {
    setShowWelcomeModal(false);
  };

  return (
    <>
      {/* Welcome Modal Popup */}
      {showWelcomeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close" onClick={handleShopNow}>
              ✕
            </button>
            <h1 className="modal-title">Welcome to NEXORA</h1>
            <p className="modal-tagline">
              Your Premium Online Shopping Destination
            </p>
            <p className="modal-description">
              Discover an exclusive collection of quality products curated just
              for you. From fashion to electronics, find everything you need in
              one place.
            </p>
            <div className="modal-features">
              <div className="feature">
                <span className="feature-icon">🚚</span>
                <span>Free Shipping</span>
              </div>
              <div className="feature">
                <span className="feature-icon">✓</span>
                <span>Secure Checkout</span>
              </div>
              <div className="feature">
                <span className="feature-icon">⭐</span>
                <span>Top Quality</span>
              </div>
            </div>
            <Link to="/products">
              <button className="modal-button" onClick={handleShopNow}>
                Shop Now
              </button>
            </Link>
          </div>
        </div>
      )}

      {/* Categories Section */}
      <section className="categories-section">
        <h2>Shop by Category</h2>
        <div className="categories-grid">
          <Link to="/categories/mens-clothing" className="category-card">
            <div className="category-icon">👔</div>
            <h3>Men's Fashion</h3>
            <p>Trending styles</p>
          </Link>
          <Link to="/categories/womens-clothing" className="category-card">
            <div className="category-icon">👗</div>
            <h3>Women's Fashion</h3>
            <p>Latest collections</p>
          </Link>
          <Link to="/categories/jewelery" className="category-card">
            <div className="category-icon">💎</div>
            <h3>Jewelry</h3>
            <p>Elegant pieces</p>
          </Link>
          <Link to="/categories/electronics" className="category-card">
            <div className="category-icon">💻</div>
            <h3>Electronics</h3>
            <p>Tech essentials</p>
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="products">
        <h2>Featured Products</h2>
        <div className="products-grid">
          <div className="product-card">
            <div className="product-image">📦</div>
            <h3>Product Name</h3>
            <p className="product-price">$99.99</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
          <div className="product-card">
            <div className="product-image">📦</div>
            <h3>Product Name</h3>
            <p className="product-price">$149.99</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
          <div className="product-card">
            <div className="product-image">📦</div>
            <h3>Product Name</h3>
            <p className="product-price">$79.99</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
          <div className="product-card">
            <div className="product-image">📦</div>
            <h3>Product Name</h3>
            <p className="product-price">$199.99</p>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        </div>
        <Link to="/products">
          <button className="offer-button">View All Products</button>
        </Link>
      </section>

      {/* Special Offer Section */}
      <section className="special-offer">
        <div className="offer-content">
          <h2>Limited Time Offer!</h2>
          <p>Get up to 50% off on selected items</p>
          <Link to="/deals">
            <button className="offer-button">Shop Deals</button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
