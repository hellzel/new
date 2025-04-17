import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/languageContext';

function SelectedServices({ selectedServices, detailKey, onServiceDeselect }) {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef(null);

  // Scroll into view whenever the user selects/deselects a service
  useEffect(() => {
    if (selectedServices.length > 0) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedServices]);

  return (
    <section id="selected-services" ref={sectionRef}>
      <h2>{t.selectedServicesTitle}</h2>

      <div id="selected-services-list">
        {selectedServices.map((key) => (
          <div key={key} className="selected-service">
            <div
              className="circle"
              onClick={() => onServiceDeselect(key)}
              title={t.removeService || 'Remove'}
              style={{ cursor: 'pointer' }}
            />
            <span>
              {t[`${key}Title`]}
              <button
                type="button"
                className="remove-btn"
                onClick={() => onServiceDeselect(key)}
                aria-label={t.removeService || 'Remove service'}
              >
                ×
              </button>
            </span>
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
