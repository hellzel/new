import React from 'react';
import './Logo.css'; // Pidetään tyylit erillään
import { useLanguage } from '../../context/LanguageContext'; // Säädä polku tarvittaessa

function Logo() {
  const { translations, language } = useLanguage();
  const t = translations[language];

  return (
    <div className="text-logo">
      <div className="logo-main">{t.logoMain}</div> {/* Translated logo */}
      <div className="logo-sub">{t.logoSub}</div>   {/* Translated subtitle */}
    </div>
  );
}

export default Logo;
