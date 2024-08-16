
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCart);
  }, []);

  const handleCheckout = () => {
  
    navigate('/Checkout', { state: { items: cartItems } });
  };

  return (
    <div className="text-center pt-5 shadow w-75 m-auto bg-secondary text-white">
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          <ul className="list-unstyled">
            {cartItems.map((item, index) => (
              <li key={index} className="border-bottom pb-2 mb-2">
                <img src={item.cover} alt="Cover" height={100} />
                <h5>{item.title}</h5>
                <p>Original Title: {item.originalTitle}</p>
                <p>Release Date: {item.releaseDate}</p>
                <p>Price: &#8377;{item.pages}</p>
                <p>Rating: {item.rating}</p>
                <p>Comment: {item.commentsList.map(c => <span key={c.text}>{c.text}</span>)}</p>
              </li>
            ))}
          </ul>
          <button className="btn btn-warning mt-3" onClick={handleCheckout}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
