import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import CartItem from './CartItem';
import './App.css';

// Placeholder thumbnail generator (replace with real plant image URLs if you like)
const thumb = (name) =>
  `https://placehold.co/200x160/2e7d32/ffffff?text=${encodeURIComponent(name)}`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: thumb('Snake Plant'), description: 'Produces oxygen at night and removes toxins.', cost: '$15' },
      { name: 'Spider Plant', image: thumb('Spider Plant'), description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      { name: 'Peace Lily', image: thumb('Peace Lily'), description: 'Removes mold spores and purifies indoor air.', cost: '$18' },
      { name: 'Boston Fern', image: thumb('Boston Fern'), description: 'Adds humidity and removes air pollutants.', cost: '$20' },
      { name: 'Rubber Plant', image: thumb('Rubber Plant'), description: 'Large glossy leaves that absorb airborne toxins.', cost: '$17' },
      { name: 'Aloe Vera', image: thumb('Aloe Vera'), description: 'Purifies air and its gel soothes skin.', cost: '$14' },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: thumb('Lavender'), description: 'Calming fragrance that helps you relax.', cost: '$20' },
      { name: 'Jasmine', image: thumb('Jasmine'), description: 'Sweet-smelling flowers that perfume a room.', cost: '$18' },
      { name: 'Rosemary', image: thumb('Rosemary'), description: 'Fragrant herb that is also used in cooking.', cost: '$15' },
      { name: 'Mint', image: thumb('Mint'), description: 'Fresh, refreshing scent and great for teas.', cost: '$10' },
      { name: 'Lemon Balm', image: thumb('Lemon Balm'), description: 'Lemon-scented leaves that calm the mind.', cost: '$12' },
      { name: 'Basil', image: thumb('Basil'), description: 'Aromatic herb loved in many kitchens.', cost: '$9' },
    ],
  },
  {
    category: 'Low Maintenance Plants',
    plants: [
      { name: 'ZZ Plant', image: thumb('ZZ Plant'), description: 'Thrives in low light and needs little water.', cost: '$22' },
      { name: 'Pothos', image: thumb('Pothos'), description: 'Fast-growing trailing vine that is very forgiving.', cost: '$11' },
      { name: 'Cactus', image: thumb('Cactus'), description: 'Needs very little water and lots of sun.', cost: '$8' },
      { name: 'Jade Plant', image: thumb('Jade Plant'), description: 'Hardy succulent said to bring good luck.', cost: '$13' },
      { name: 'Succulent Mix', image: thumb('Succulent Mix'), description: 'A colourful set of easy-care succulents.', cost: '$16' },
      { name: 'Ponytail Palm', image: thumb('Ponytail Palm'), description: 'Stores water in its trunk, so it rarely needs watering.', cost: '$19' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  // Total number of items in the cart (shown next to the cart icon)
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // A plant's button is disabled while that plant is in the cart
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  const handleHomeClick = (e) => {
    e.preventDefault();
    onHomeClick();
  };

  const handlePlantsClick = (e) => {
    e.preventDefault();
    setShowCart(false);
  };

  const handleCartClick = (e) => {
    e.preventDefault();
    setShowCart(true);
  };

  return (
    <div>
      {/* Navbar: shown on both the Product Listing and Cart pages */}
      <nav className="navbar">
        <strong>Paradise Nursery</strong>
        <div>
          <a href="#home" onClick={handleHomeClick}>Home</a>
          <a href="#plants" onClick={handlePlantsClick}>Plants</a>
          <a href="#cart" onClick={handleCartClick}>
            🛒 Cart ({totalQuantity})
          </a>
        </div>
      </nav>

      {!showCart ? (
        <div style={{ padding: 20 }}>
          {plantsArray.map((group) => (
            <section key={group.category}>
              <h2>{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p>{plant.description}</p>
                    <p><strong>{plant.cost}</strong></p>
                    <button
                      disabled={isInCart(plant.name)}
                      onClick={() => handleAddToCart(plant)}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      )}
    </div>
  );
}

export default ProductList;
