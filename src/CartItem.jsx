import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './App.css';

// Converts a price string like "$15" into the number 15
const getUnitPrice = (cost) => parseFloat(String(cost).replace('$', ''));

function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Total cost for one plant type (unit price x quantity)
  const calculateTotalCost = (item) => getUnitPrice(item.cost) * item.quantity;

  // Total number of plants in the cart
  const totalPlants = items.reduce((sum, item) => sum + item.quantity, 0);

  // Total amount of all plants in the cart
  const calculateTotalAmount = () =>
    items.reduce((sum, item) => sum + calculateTotalCost(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Quantity would drop to 0, so remove the plant from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = () => {
    alert('Coming Soon');
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Total Plants in Cart: {totalPlants}</h2>
      <h2>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>

      {items.length === 0 && <p>Your cart is empty.</p>}

      {items.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div>
            <h3>{item.name}</h3>
            <p>Unit Price: {item.cost}</p>
            <div>
              <button onClick={() => handleDecrement(item)}>-</button>
              <span style={{ margin: '0 12px' }}>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p>Total: ${calculateTotalCost(item).toFixed(2)}</p>
            <button onClick={() => handleRemove(item)}>Delete</button>
          </div>
        </div>
      ))}

      <div style={{ marginTop: 20 }}>
        <button onClick={handleContinueShopping}>Continue Shopping</button>
        <button style={{ marginLeft: 12 }} onClick={handleCheckoutShopping}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;
