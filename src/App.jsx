import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route }  from 'react-router-dom'
const Header =lazy(() => import('./Components/Header/Header'));
const Home = lazy(() => import('./Components/Home/Home'));
const Login = lazy(() => import ('./Components/Login/Login'));
const Signup = lazy(() => import('./Components/Signup/Signup'));
const Dashboard = lazy(() => import('./Components/Dashboard/Dashboard'))
const Houses = lazy (() => import ('./Components/Houses/Houses'));
const Books = lazy (() => import ('./Components/Books/Books'));
const Spells = lazy (() => import ('./Components/Spells/Spells'));
const Characters = lazy (() => import ('./Components/Characters/Characters'));
const FavoriteBooks=lazy(() => import('./Components/FavoriteBooks/FavoriteBooks'));
 import BookInfo from './Components/BookInformation/BookInfo';
 import Checkout from './Components/CheckOut/Checkout';
 import Wishlist from './Components/Wishlist/Wishlist';

const App = () => {
  return (
    <BrowserRouter>
    <Header />
    <Suspense fallback={ <h1>Loading the component....</h1> } >
         <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/dashboard' element={<Dashboard /> } />
            <Route path='*' element={<h1>Page Not found</h1>} /> 
            <Route path='/Houses' element={<Houses />} />
            <Route path='/Characters' element={<Characters />} />
            <Route path='/Spells' element={<Spells />} />
            <Route path='/books' element={<Books />} />
            <Route path='/FavoriteBooks' element={<FavoriteBooks/>}/>
            <Route path='/bookInfo/:index' element={<BookInfo/>}/>
            <Route path="/book-info" element={<BookInfo />} />
            <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path="/checkout" element={<Checkout />} />

        </Routes>
    </Suspense>

    </BrowserRouter>
  )
}

export default App;


// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Books from './Books';
// import Wishlist from './Wishlist';
// import BookInfo from './BookInfo'; // Assuming you have this component

// const App = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Books />} />
//         <Route path="/wishlist" element={<Wishlist />} />
//         <Route path="/bookInfo/:id" element={<BookInfo />} />
//       </Routes>
//     </Router>
//   );
// };

// export default App;
