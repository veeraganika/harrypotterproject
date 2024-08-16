// import React from 'react'

// const Books = () => {
//   return (
//     <div>
//       HARRY POTTER BOOKS
//     </div>
//   )
// }

// export default Books

// import React, { useState, useEffect } from 'react';
//  import './Books.css'
// import { Link } from 'react-router-dom';
// const Books = () => {
//   const [books, setBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const response = await fetch('https://potterapi-fedeperin.vercel.app/en/books');
//       const data = await response.json();
//       setBooks(data);
//       setFilteredBooks(data);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   const handleSearch = (event) => {
//     setSearchTerm(event.target.value);
//     filterBooks(event.target.value);
//   };

//   const filterBooks = (query) => {
//     if (!query) {
//       setFilteredBooks(books);
//       return;
//     }
//     const lowerCaseQuery = query.toLowerCase();
//     const filteredData = books.filter((book) =>
//       book.title.toLowerCase().includes(lowerCaseQuery)
//     );
//     setFilteredBooks(filteredData);
//   };

//   return (
//     <div className="books-container ">

// <input
//     placeholder="Search Book   Name here"
//     className="searchInput"
//     value={searchTerm}
//         onChange={handleSearch}
//       />


//       <ul className="books-list  display-flex flex-wrap justify-content-center">
//         {filteredBooks.map((book) => (
//           <li key={book._id}>
//             {/* <h3>{book.title}</h3> */}
//             <img src={book.cover} />
//             <p>{book.originalTitle}</p>
//             <p>{book.releaseDate}</p>
//             <h1> price:&#8377;{book.pages}</h1> <br/>
//             <p>{book.price}</p>
            
//               <Link className="btn btn-primary m-1" to={`/bookInfo/${book.index}`} state={book}>View</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );s
// };

// export default Books;

import React, { useState, useEffect } from 'react';
import './Books.css';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    fetchBooks();
    
    const storedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(storedWishlist);
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('https://potterapi-fedeperin.vercel.app/en/books');
      const data = await response.json();
      setBooks(data);
      setFilteredBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    filterBooks(event.target.value);
  };

  const filterBooks = (query) => {
    if (!query) {
      setFilteredBooks(books);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const filteredData = books.filter((book) =>
      book.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredBooks(filteredData);
  };

  const handleWishlistToggle = (book) => {
    const updatedWishlist = wishlist.some(item => item._id === book._id)
      ? wishlist.filter(item => item._id !== book._id)
      : [...wishlist, book];

    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const isInWishlist = (bookId) => {
    return wishlist.some(item => item._id === bookId);
  };

  return (
    <div className="books-container">
      <input
        placeholder="Search Book Name here"
        className="searchInput"
        value={searchTerm}
        onChange={handleSearch}
      />
      <ul className="books-list display-flex flex-wrap justify-content-center">
        {filteredBooks.map((book) => (
          <li key={book._id} className="book-item">
            <img src={book.cover} alt={book.title} />
            <p>{book.originalTitle}</p>
            <p>{book.releaseDate}</p>
            <h1>Price: &#8377;{book.pages}</h1>
            <p>{book.price}</p>
            <Link className="btn btn-primary m-1" to={`/bookInfo/${book.index}`} state={book}>View</Link>
            <button
              className={`btn m-1 ${isInWishlist(book._id) ? 'btn-danger' : 'btn-secondary'}`}
              onClick={() => handleWishlistToggle(book)}
            >
              {isInWishlist(book._id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;






