import React from 'react';
import { useLanguage } from '../contexts/languageContext';  // Importing useLanguage hook
import Audience from './Audience';  // Import Audience here

function Services({ onServiceSelect }) {
  const { language, translations } = useLanguage();
  const t = translations[language];  // Access translations based on selected language

  return (
    <section id="services">
      <h2>{t.servicesTitle}</h2>
      <div className="services-container">
        <div className="service service-option" onClick={() => onServiceSelect(t.service1Title)}>
          <h3>{t.service1Title}</h3>
          <p>{t.service1Desc}</p>
        </div>
        <div className="service service-option" onClick={() => onServiceSelect(t.service2Title)}>
          <h3>{t.service2Title}</h3>
          <p>{t.service2Desc}</p>
        </div>
        <div className="service service-option" onClick={() => onServiceSelect(t.service3Title)}>
          <h3>{t.service3Title}</h3>
          <p>{t.service3Desc}</p>
        </div>
      </div>

      <Audience />  {/* Added Audience component here */}
    </section>
  );
}

export default Services;
