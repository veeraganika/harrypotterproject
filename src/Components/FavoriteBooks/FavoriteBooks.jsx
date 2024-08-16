// import React, { useState, useEffect } from 'react';

// const FavoriteBooks = () => {
//   const [favoriteBooks, setFavoriteBooks] = useState([]);

//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
//     setFavoriteBooks(storedFavorites);
//   }, []);

//   const toggleFavorite = (bookId) => {
//     let updatedFavorites;
//     if (favoriteBooks.includes(bookId)) {
//       updatedFavorites = favoriteBooks.filter(id => id !== bookId);
//     } else {
//       updatedFavorites = [...favoriteBooks, bookId];
//     }
//     setFavoriteBooks(updatedFavorites);
//     localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
//   };

//   return (
//     <div className="favorite-books-container">
//       <h2>Favorite Books</h2>
//       <ul className="favorite-books-list">
//         {favoriteBooks.map((bookId) => (
//           <li key={bookId}>
//             <button onClick={() => toggleFavorite(bookId)}>Remove from Favorites</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default FavoriteBooks;