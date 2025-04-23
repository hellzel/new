import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/languageContext';

function Header({ menuOpen, toggleMenu }) {
  const { language, translations, toggleLanguage } = useLanguage();
  const location = useLocation();
  const t = translations[language];

  const isHeroPage = location.pathname === '/';

  return (
    <header>
      <nav className="site-header">
        <div className="header-left">
          <Link to="/" className="text-logo" aria-label="Homepage">
            <div className="logo-main">{t.logoMain}</div> {/* Translated logo */}
            <div className="logo-sub">{t.logoSub}</div>   {/* Translated subtitle */}
          </Link>
        </div>

        <div className="header-right">
          {!isHeroPage && (
            <div
              className="menu-toggle"
              id="menu-toggle"
              aria-label="Open navigation menu"
              onClick={toggleMenu}
            >
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
        </div>
      </nav>
    </header>
  );
}

export default Header;
