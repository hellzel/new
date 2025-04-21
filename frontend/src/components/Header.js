import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/languageContext';

function Header({ menuOpen, toggleMenu }) {
  const { language, toggleLanguage } = useLanguage();
  const location = useLocation();

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

  const t = labels[language];

  // Hide hamburger menu only on the homepage (hero section)
  const isHeroPage = location.pathname === '/';

  return (
    <header>
      <nav>
        {!isHeroPage && (
          <div className="menu-toggle" id="menu-toggle" aria-label="Open navigation menu" onClick={toggleMenu}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
          </div>
        )}

        <ul id="nav-links" className={menuOpen ? 'active' : ''}>
          <li><Link to="/" onClick={toggleMenu}>{t.home}</Link></li>
          <li><Link to="/services" onClick={toggleMenu}>{t.services}</Link></li>
          <li><Link to="/contact" onClick={toggleMenu}>{t.contact}</Link></li>
        </ul>

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
