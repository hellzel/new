import React from 'react';

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
          <li><a href="#home">Home</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;