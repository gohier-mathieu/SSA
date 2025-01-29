import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './../styles/navbar.css';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/home'; // Page Home

  return (
    <nav className="navbar">
      <Link to="/">
        <img
          src="/img/img/IMG_4590-removebg-preview.png"
          alt="Logo"
          className={`navbar-logo ${isHome ? 'centered' : ''}`} 
        />
      </Link>

      {!isHome && (
        <Link to="/home" className="navbar-cross">
          &#10005; 
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
