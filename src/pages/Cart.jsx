import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <h1>Shopping Cart</h1>
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <p>Add some products to get started!</p>
          <button
            onClick={() => navigate("/products")}
            className="offer-button"
          >
            Shop Now
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Shopping Cart</h1>

      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} />

              <div className="cart-item-details">
                <h3>{item.title}</h3>
                <p className="cart-item-category">{item.category}</p>
                <p className="cart-item-price">${item.price}</p>
              </div>

              <div className="cart-item-actions">
                <div className="quantity-controls">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className="cart-item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  className="remove-button"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal:</span>
            <span>${getCartTotal().toFixed(2)}</span>
          </div>

          <div className="summary-row">
            <span>Shipping:</span>
            <span>{getCartTotal() > 50 ? "FREE" : "$9.99"}</span>
          </div>

          <div className="summary-row">
            <span>Tax (8%):</span>
            <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
          </div>

          <div className="summary-row total">
            <span>Total:</span>
            <span>
              $
              {(
                getCartTotal() +
                (getCartTotal() > 50 ? 0 : 9.99) +
                getCartTotal() * 0.08
              ).toFixed(2)}
            </span>
          </div>

          {getCartTotal() < 50 && (
            <p className="shipping-notice">
              Add ${(50 - getCartTotal()).toFixed(2)} more for FREE shipping!
            </p>
          )}

          <button
            className="checkout-button"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </button>

          <button
            className="continue-shopping"
            onClick={() => navigate("/products")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
