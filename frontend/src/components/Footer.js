import React from 'react';
import { useLanguage } from '../contexts/languageContext'; // adjust path if needed

function Footer() {
  const { language, translations } = useLanguage();
  const t = translations[language];

  return (
    <footer>
      <div className="footer-contact-info">
        <p><strong>{t.email}:</strong> <a href="mailto:info@provenienssi.fi">info@provenienssi.fi</a></p>
        <p><strong>{t.phone}:</strong> <a href="tel:+358401234567">+358 40 123 4567</a></p>
        <p><strong>{t.address}:</strong> {t.addressValue}</p>
      </div>
      <p>&copy; 2025 Provenienssi. {t.allRightsReserved}.</p>
    </footer>
  );
}

export default Footer;
