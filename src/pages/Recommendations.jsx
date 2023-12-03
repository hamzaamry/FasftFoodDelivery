import React from 'react';
import { useSelector } from 'react-redux';

const Recommendations = () => {

  const cartItems = useSelector((state) => state.cart.cartItems);

  return (
    <div>
      <h2>Recommendations</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - Quantity: {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
