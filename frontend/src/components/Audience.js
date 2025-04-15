import React from 'react';
import { useLanguage } from '../contexts/languageContext';  // Importing useLanguage hook

function Audience() {
  const { language, translations } = useLanguage();
  const t = translations[language];  // Access translations based on selected language

  return (
    <section id="audience">
      <h2>{t.audienceTitle}</h2>
      <ul className="audience-list">
        <li><i className="fas fa-gavel"></i> {t.auctions}</li>
        <li><i className="fas fa-palette"></i> {t.galleries}</li>
        <li><i className="fas fa-gem"></i> {t.collectors}</li>
        <li><i className="fas fa-store"></i> {t.dealers}</li>
        <li><i className="fas fa-leaf"></i> {t.estates}</li>
        <li><i className="fas fa-shield-alt"></i> {t.insurance}</li>
      </ul>
    </section>
  );
}

export default Audience;
