import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaSignInAlt, FaSignOutAlt, FaStore, FaBoxOpen } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2><FaStore style={{ marginRight: '8px' }} />ShopEasy</h2>
      <div>
        {isLoggedIn ? (
          <>
            <Link to="/"><FaBoxOpen />Products</Link>
            <Link to="/cart"><FaShoppingCart  />Cart</Link>
            <button onClick={handleLogout}><FaSignOutAlt />Logout</button>
          </>
        ) : (
          <Link to="/login"><FaSignInAlt/>Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
