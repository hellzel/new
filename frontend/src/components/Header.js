import React from 'react';
import { Link } from 'react-router-dom';

function Header({ menuOpen, toggleMenu }) {
  return (
    <header>
      <nav>
        <div className="menu-toggle" id="menu-toggle" aria-label="Open navigation menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
        <ul id="nav-links" className={menuOpen ? 'active' : ''}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
