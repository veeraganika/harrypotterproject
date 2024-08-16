import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Wishlist.css'
const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  return (
    <div className="wishlist-container">
      <h1> Wishlist Items</h1>
      {wishlist.length === 0 ? (
        <p>No items in the  wishlist.</p>
      ) : (
        <ul className="books-list display-flex flex-wrap justify-content-center">
          {wishlist.map((book) => (
            <li key={book._id} className="book-item">
              <img src={book.cover} alt={book.title} />
              <p>{book.originalTitle}</p>
              <p>{book.releaseDate}</p>
              <h1>Price: &#8377;{book.pages}</h1>
              <p>{book.price}</p>
              <Link className="btn btn-primary m-1" to={`/bookInfo/${book.index}`} state={book}>View</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Wishlist;
