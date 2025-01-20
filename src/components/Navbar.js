import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './../styles/navbar.css';

function Navbar() {
  const location = useLocation();
  const isHome = location.pathname === '/' || location.pathname === '/home'; // Page Home

  return (
    <nav className="navbar">
      {/* Image au centre uniquement si on est sur la page home */}
      <Link to="/">
        <img
          src="/img/img/IMG_4590-removebg-preview.png"
          alt="Logo"
          className={`navbar-logo ${isHome ? 'centered' : ''}`} // Ajout de la classe 'centered' si on est sur la page Home
        />
      </Link>

      {/* La croix s'affiche uniquement si on n'est pas sur / ou /home */}
      {!isHome && (
        <Link to="/home" className="navbar-cross">
          &#10005; {/* La croix (X) */}
        </Link>
      )}
    </nav>
  );
}

export default Navbar;
