import React from 'react';
import { useLanguage } from '../contexts/languageContext';
import Audience from './Audience';

function Services({ onServiceSelect }) {
  const { language, translations } = useLanguage();
  const t = translations[language];

  return (
    <section id="services">
      <h2>{t.servicesTitle}</h2>
      <div className="services-container">
        <div className="service service-option" onClick={() => onServiceSelect('service1')}>
          <h3>{t.service1Title}</h3>
          <p>{t.service1Desc}</p>
        </div>
        <div className="service service-option" onClick={() => onServiceSelect('service2')}>
          <h3>{t.service2Title}</h3>
          <p>{t.service2Desc}</p>
        </div>
        <div className="service service-option" onClick={() => onServiceSelect('service3')}>
          <h3>{t.service3Title}</h3>
          <p>{t.service3Desc}</p>
        </div>
      </div>
      <Audience />
    </section>
  );
}

export default Services;
