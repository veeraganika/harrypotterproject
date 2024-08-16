
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const { state } = useLocation(); 

  useEffect(() => {
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);

    const total = cart.reduce((sum, item) => sum + (item.pages || 0), 0);
    setTotalPrice(total);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Checkout</h1>
      {cartItems.length > 0 ? (
        <div>
          <h4 className=" check display-flex text-center mb-4">Your Ordered Items:</h4>
          <ul className="list-unstyled display-flex text-center bg-">
            {cartItems.map((item, index) => (
              <li key={index} className="border-bottom display-flex bg-success flex-wrap pb-3 mb-3">
                <h5>{item.title}</h5>
                <img src={item.cover} alt="Cover" height={200} />
                <p>Original Title: {item.originalTitle}</p>
                <p>Release Date: {item.releaseDate}</p>
                <p>Price: &#8377;{item.pages}</p>
                <p>Rating: {item.rating}</p>
                <p>Comments:</p>
                <ul className="list-unstyled">
                  {item.commentsList.map((comment, i) => (
                    <li key={i} className="border-bottom pb-1 mb-1">
         <strong>Rating: {comment.rating}</strong>
                      <p>{comment.text}</p>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <h4>Total Price: &#8377;{totalPrice}</h4>
          
        </div>
      ) : (
        <p>No items in the cart.</p>
      )}
    </div>
  );
};

export default Checkout;
