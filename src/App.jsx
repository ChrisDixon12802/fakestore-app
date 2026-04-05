import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import { ProductsProvider } from "./context/ProductsContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import AddProduct from "./pages/AddProduct";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Deals from "./pages/Deals";
import Categories from "./pages/Categories";

function App() {
  return (
    <ProductsProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/add-product" element={<AddProduct />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>

          {/* Footer */}
          <footer className="footer">
            <div className="footer-content">
              <div className="footer-section">
                <h3>NEXORA</h3>
                <p>Your premium online shopping destination</p>
              </div>
              <div className="footer-section">
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <a href="#about">About Us</a>
                  </li>
                  <li>
                    <a href="#contact">Contact</a>
                  </li>
                  <li>
                    <a href="#faq">FAQ</a>
                  </li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Customer Service</h4>
                <ul>
                  <li>
                    <a href="#shipping">Shipping Info</a>
                  </li>
                  <li>
                    <a href="#returns">Returns</a>
                  </li>
                  <li>
                    <a href="#support">Support</a>
                  </li>
                </ul>
              </div>
              <div className="footer-section">
                <h4>Follow Us</h4>
                <div className="social-icons">
                  <a href="#facebook">📘</a>
                  <a href="#instagram">📷</a>
                  <a href="#twitter">🐦</a>
                </div>
              </div>
            </div>
            <div className="footer-bottom">
              <p>&copy; 2026 NEXORA. All rights reserved.</p>
            </div>
          </footer>
        </Router>
      </CartProvider>
    </ProductsProvider>
  );
}

export default App;
