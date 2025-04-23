import React, { useEffect, useRef } from 'react';
import { useLanguage } from '../contexts/languageContext';
import { useNavigate } from 'react-router-dom';

export default function SelectedServices({
  selectedServices,
  detailKey,
  onServiceDeselect
}) {
  const { language, translations } = useLanguage();
  const t = translations[language];
  const sectionRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedServices.length) {
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedServices]);

  const translateKey = key => {
    switch (key) {
      case 'service1': return t.service1Title;
      case 'service2': return t.service2Title;
      case 'service3': return t.service3Title;
      default: return key;
    }
  };

  return (
    <section id="selected-services" ref={sectionRef}>
      <h2>{t.selectedServicesTitle}</h2>
      <div id="selected-services-list">
        {selectedServices.length > 0 ? (
          selectedServices.map(key => (
            <div key={key} className="selected-service">
              <span>{translateKey(key)}</span>
              <button
                className="remove-btn"
                onClick={() => onServiceDeselect(key)}
                aria-label={t.removeService || 'Remove service'}
              >
                ×
              </button>
            </div>
          ))
        ) : (
          <p>{t.noSelectedServices}</p>
        )}
      </div>

      {detailKey && (
        <div id="service-details" className="service-details">
          <h3>{t.serviceDetailsTitle}</h3>
          <p style={{ whiteSpace: 'pre-line' }}>
            {t[`${detailKey}Detail`]}
          </p>
        </div>
      )}

      {selectedServices.length > 0 && (
        <div className="proceed-container">
          <button
            className="proceed-to-contact"
            onClick={() => navigate('/contact')}
          >
            {t.proceedButtonText}
          </button>
        </div>
      )}
    </section>
  );
}
