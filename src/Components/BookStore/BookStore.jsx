import React, { useState, useEffect } from 'react';
   import axios from 'axios';

   const BookStore = () => {
     const [books, setBooks] = useState([]);
     const [cart, setCart] = useState([]);
     const [likedBooks, setLikedBooks] = useState([]);

     useEffect(() => {
  
       const fetchBooks = async () => {
         try {
           const response = await axios.get('https://potterapi-fedeperin.vercel.app/en/books');
           setBooks(response.data);
         } catch (error) {
           console.error("Error fetching books:", error);
         }
       };

       fetchBooks();
     }, []);

     const handleLike = (bookId) => {
       setLikedBooks((prev) => [...prev, bookId]);
     };

     const handleUnlike = (bookId) => {
       setLikedBooks((prev) => prev.filter(id => id !== bookId));
     };

     const handleAddToCart = (book) => {
       setCart((prev) => [...prev, book]);
     };

     const handleBuyNow = async (book) => {
       try {
      
         const response = await axios.post('https://example.com/payment', { book });
         if (response.status === 200) {
           alert('Payment successful!');
         }
       } catch (error) {
         console.error("Payment failed:", error);
       }
     };

     return (
       <div>
         <h1>Book Store</h1>
         <div>
           {books.map((book) => (
             <div key={book._id}>
               <h2>{book.title}</h2>
               <button onClick={() => handleLike(book._id)}>Like</button>
               <button onClick={() => handleUnlike(book._id)}>Unlike</button>
               <button onClick={() => handleAddToCart(book)}>Add to Cart</button>
               <button onClick={() => handleBuyNow(book)}>Buy Now</button>
             </div>
           ))}
         </div>
         <div>
           <h2>Cart</h2>
           <ul>
             {cart.map((item, index) => (
               <li key={index}>{item.title}</li>
             ))}
           </ul>
         </div>
         <div>
           <h2>Liked Books</h2>
           <ul>
             {books.filter(book => likedBooks.includes(book._id)).map((book) => (
               <li key={book._id}>{book.title}</li>
             ))}
           </ul>
         </div>
       </div>
     );
   };

   export default BookStore;