import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();

  return (
    <nav className="modern-nav">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">✨</span>
          <span className="logo-text">NEXORA</span>
        </Link>

        <ul className="nav-links">
          <li>
            <Link to="/products">Shop</Link>
          </li>
          <li>
            <Link to="/categories">Categories</Link>
          </li>
          <li>
            <Link to="/deals">Deals</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>

        <div className="nav-actions">
          <a href="#search" className="nav-icon" title="Search">
            🔍
          </a>
          <a href="#favorites" className="nav-icon" title="Favorites">
            <span>❤️</span>
            <span className="badge">0</span>
          </a>
          <Link to="/cart" className="nav-icon" title="Cart">
            <span>🛒</span>
            {cartCount > 0 && <span className="badge">{cartCount}</span>}
          </Link>
          <a href="#account" className="nav-btn">
            Sign In
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
