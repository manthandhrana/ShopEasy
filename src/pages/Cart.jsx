import React, { useState } from 'react';
import './Cart.css';
import { FaTrash, FaPlus, FaMinus, FaShoppingCart } from 'react-icons/fa';

const Cart = ({ cartItems, setCartItems }) => {
  const [showPopup, setShowPopup] = useState(false);

  const updateQuantity = (id, quantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 4000);
    setCartItems([]);
  };

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="cart-container">
      <h2><FaShoppingCart style={{ marginRight: '8px' }} /> Your Cart</h2>
      {cartItems.length === 0 ? (
        <p className='cart-list'>Your cart is empty!</p>
      ) : (
        <>
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.title} />
                <div>
                  <h4>{item.title}</h4>
                  <p>${item.price}</p>
                  <div className="quantity-control">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <FaMinus />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <FaPlus />
                    </button>
                  </div>
                  <button className="remove" onClick={() => removeFromCart(item.id)}>
                    <FaTrash style={{ marginRight: '5px' }} /> Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-footer">
            <p><strong>Total: ${totalPrice.toFixed(2)}</strong></p>
            <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
          </div>
        </>
      )}

      {showPopup && (
        <div className="popup">
          🎉 Order placed successfully!
        </div>
      )}
    </div>
  );
};

export default Cart;
