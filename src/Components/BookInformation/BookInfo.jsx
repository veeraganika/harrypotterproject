
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import likeIcon from '../../../public/heart (1).png';
import disLike from '../../../public/heart.png'; 
import './bookInfo.css'
const BookInfo = () => {
  const navigate = useNavigate();
  const [like, setLike] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [commentsList, setCommentsList] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const { state } = useLocation();

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(cart);
  }, []);

  if (!state) {
    return <p>No book information available</p>;
  }

  const { title, cover, originalTitle, releaseDate, pages } = state;

  const likeHandler = () => setLike(!like);

  
  const getCartTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.pages || 0), 0);
  };

  
  const openPaymentModal = (amount) => {
    const options = {
      key: 'rzp_test_GHqJHD4DXabY3z',
      amount: amount * 100, 
      currency: "INR",
      description: "BOOKS",
      handler: function (response) {
        if (response.razorpay_payment_id) {
          navigate('/Checkout', { state: { ...state, favorite: like } });
        } else {
          console.error("Payment failed", response);
        }
      },
      prefill: {
        name: 'ganika',
        email: 'ganika@gmail.com',
        contact: '7416998110'
      }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      console.error("Razorpay script not loaded");
    }
  };


  const handleBuyNow = () => {
    const totalPrice = getCartTotalPrice();
    if (totalPrice > 0) {
      openPaymentModal(totalPrice);
    } else {
      alert('Cart is empty!');
    }
  };

  const handleRatingChange = (event) => {
    setRating(Number(event.target.value));
  };

  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };
  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setCommentsList([...commentsList, { text: comment, rating }]);
      setComment("");
      setRating(0);
    }
  };
  const addToCart = () => {
    const newCartItem = { title, cover, originalTitle, releaseDate, pages, rating, commentsList };
    const updatedCart = [...cartItems, newCartItem];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
    alert('Book added to cart!');
  };

  const removeFromCart = (index) => {
    const updatedCart = cartItems.filter((_, i) => i !== index);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  return (
    <div className=" text text-center pt-5 shadow w-50 m-auto  text-dark">
      
      <div className="d-flex justify-content-around align-items-center mb-3">
        <div className="image">
        {/* <span onClick={likeHandler}>
          <img  height={50}
            src={like ? likeIcon : disLike}
            alt={like ? "Like icon" : "Dislike icon"}
          />
        </span> */}
        </div>
      </div>
      <div>
      <span onClick={likeHandler}>
          <img  className="img mt-1" height={40}
            src={like ? likeIcon : disLike}
            alt={like ? "Like icon" : "Dislike icon"}
          />
          </span>
        <img height={200} src={cover} alt="Cover" />
        <h4 className="mt-3">Title: {title}</h4>
        <p className="mt-3">Original Title: {originalTitle}</p>
        <p className="mt-3">Release Date: {releaseDate}</p>
        <h4 className="mt-3">Price: &#8377;{pages}</h4>
      </div>
      <div className="mt-3">
        <button className="btn btn-outline-warning" onClick={handleBuyNow}>Buy Now</button>
        <button className="btn btn-outline-info m-3" onClick={addToCart}>Add to Cart</button>
      </div>

      <div className="mt-4">
        <h5>Rate and Comment</h5>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <select
            id="rating"
            className="form-control"
            value={rating}
            onChange={handleRatingChange}
          >
            <option value={0}>Select Rating</option>
            <option value={1}>⭐</option>
            <option value={2}>⭐⭐</option>
            <option value={3}>⭐⭐⭐</option>
            <option value={4}>⭐⭐⭐⭐</option>
            <option value={5}>⭐⭐⭐⭐⭐</option>
          </select>
        </div>
        <div className="form-group mt-2">
          <label htmlFor="comment">Comment:</label>
          <textarea
            id="comment"
            className="form-control"
            rows="3"
            value={comment}
            onChange={handleCommentChange}
          ></textarea>
        </div>
        <button className="btn btn-primary mt-2" onClick={handleCommentSubmit}>Submit Comment</button>

        <div className="mt-4">
          <h5>Comments:</h5>
          <ul className="list-unstyled">
            {commentsList.map((item, index) => (
              <li key={index} className="border-bottom pb-2 mb-2">
                <strong>Rating: {item.rating}</strong>
                <p>{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-4">
        <h4>Total Cart Price: &#8377;{getCartTotalPrice()}</h4>
      </div>

      <div className="mt-4">
        <h5>Cart Items:</h5>
        <ul className="list-unstyled">
          {cartItems.length > 0 ? (
            cartItems.map((item, index) => (
              <li key={index} className="border-bottom pb-2 mb-2">
                <h6>{item.title}</h6>
                <img src={item.cover} alt="Cover" height={100} />
                <p>Original Title: {item.originalTitle}</p>
                <p>Release Date: {item.releaseDate}</p>
                <p>Price: &#8377;{item.pages}</p>
                <button className="btn btn-warning" onClick={() => removeFromCart(index)}>Remove Item</button>
              </li>
            ))
          ) : (
            <p>No items in the cart</p>
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookInfo;
