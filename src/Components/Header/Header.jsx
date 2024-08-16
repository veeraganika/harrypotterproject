
import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FcCollect } from "react-icons/fc";
import { UserProvider } from '../AuthProvider';
import './Header.css'; 

const Header = () => {
    const { isAuthenticated, logout } = useContext(UserProvider);
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const userLogoutHandler = async () => {
        const data = await logout();
        if (data) {
            navigate('/');
        }
    };

    return (
        <div className='header'>
            <div className='header-content'>
                <div className='header-logo'>
                    <FcCollect size={50} />
                    <h1>
                        <Link className='text-decoration-none text-white' to='/'>
                            ◦•●◉✿  BOOK STORE ✿◉●•◦
                        </Link>
                    </h1>
                </div>
                <button className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>
                    ☰
                </button>
                <ul className={`nav-menu ${menuOpen ? 'open' : ''}`}>
                    <li className='list-unstyled ms-3'>
                        <Link className='text-decoration-none  display-flex fle-wrap text-white' to='/houses'>Houses</Link>
                    </li>
                    <li className='list-unstyled ms-3'>
                        <Link className='text-decoration-none text-white' to='/Characters'>Characters</Link>
                    </li>
                    <li className='list-unstyled ms-3'>
                  <Link className='text-decoration-none text-white' to='/Spells'>Spells</Link>
                    </li>
                    <li className='list-unstyled ms-3'>
                        <Link className='text-decoration-none text-white' to='/Books'>Books</Link>
                    </li>
                    <li className='list-unstyled ms-3'>
                        <Link className='text-decoration-none text-white' to='/wishlist'>Wishlist</Link>
                    </li>
                    <li className='list-unstyled ms-4'>
                        {isAuthenticated
                            ? <Link className='text-decoration-none text-white' onClick={userLogoutHandler}>LOGOUT</Link>
                            : <Link className='text-decoration-none text-white' to='/login'>LOGIN</Link>}
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
