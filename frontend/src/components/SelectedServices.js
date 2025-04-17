import React from 'react';
import { useLanguage } from '../contexts/languageContext';

function SelectedServices({ selectedServices, detailKey }) {
  const { language, translations } = useLanguage();
  const t = translations[language];

  return (
    <section id="selected-services">
      <h2>{t.selectedServicesTitle}</h2>
      <div id="selected-services-list">
        {selectedServices.map((key) => (
          <div key={key} className="selected-service">
            <div className="circle" />
            <span>{t[`${key}Title`]}</span>
          </div>
        ))}
      </div>

      {detailKey && (
        <div id="service-details" className="service-details">
          <h3>{t.serviceDetailsTitle}</h3>
          <p style={{ whiteSpace: 'pre-line' }}>
            {t[`${detailKey}Detail`]}
          </p>
        </div>
      )}
    </section>
  );
}

export default SelectedServices;
