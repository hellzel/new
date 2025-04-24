import React from 'react';
import { useLanguage } from '../contexts/languageContext';
import Audience from './Audience';
import FadeInSection from './FadeInSection';

function Services({ selectedServices, onServiceSelect, onAudienceSelect }) { // ← Added onAudienceSelect here
  const { language, translations } = useLanguage();
  const t = translations[language];

  const serviceTitles = [
    { key: 'service1', title: t.service1Title, description: t.service1Desc },
    { key: 'service2', title: t.service2Title, description: t.service2Desc },
    { key: 'service3', title: t.service3Title, description: t.service3Desc },
  ];

  const isSelected = (key) => selectedServices.includes(key);

  return (
    <FadeInSection>
      <section id="services">
        <h2>{t.servicesTitle}</h2>
        <div className="services-container">
          {serviceTitles.map((service) => (
            <div
              key={service.key}
              className={`service service-option ${isSelected(service.key) ? 'selected' : ''}`}
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button
                className={`select-btn ${isSelected(service.key) ? 'selected' : ''}`}
                onClick={() => onServiceSelect(service.key)}
              >
                {isSelected(service.key) ? t.selectedButton : t.selectButton}
              </button>
            </div>
          ))}
        </div>
        <Audience onAudienceSelect={onAudienceSelect} /> {/* ← Fixed: passed down the prop */}
      </section>
    </FadeInSection>
  );
}

export default Services;