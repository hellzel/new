import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../contexts/languageContext';

function Header({ menuOpen, toggleMenu }) {
  const { language, toggleLanguage } = useLanguage(); // Use language context

  // Define translations for each language
  const labels = {
    fi: {
      home: 'Etusivu',
      services: 'Palvelut',
      contact: 'Yhteystiedot',
      language: 'In English',
    },
    en: {
      home: 'Home',
      services: 'Services',
      contact: 'Contact',
      language: 'Suomeksi',
    },
  };

  const t = labels[language]; // Get current language labels

  return (
    <header>
      <nav>
        <div className="menu-toggle" id="menu-toggle" aria-label="Open navigation menu" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Menu links */}
        <ul id="nav-links" className={menuOpen ? 'active' : ''}>
          <li><Link to="/" onClick={toggleMenu}>{t.home}</Link></li>
          <li><Link to="/services" onClick={toggleMenu}>{t.services}</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>{t.contact}</Link></li>
        </ul>

        {/* Language toggle button placed outside of the menu */}
        <div className="language-toggle">
          <button className="language-btn" onClick={toggleLanguage}>
            {t.language}
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
