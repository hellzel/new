import React from 'react';
import { useLanguage } from '../contexts/languageContext';
import { useSelectedAudience } from '../contexts/selectedAudienceContext';

function Audience() {
  const { language, translations } = useLanguage();
  const { selectedAudience, setSelectedAudience, clearSelectedAudience } = useSelectedAudience();
  const t = translations[language];

  const audienceItems = [
    { key: 'auctions', label: t.auctions, icon: 'fas fa-gavel' },
    { key: 'galleries', label: t.galleries, icon: 'fas fa-palette' },
    { key: 'collectors', label: t.collectors, icon: 'fas fa-gem' },
    { key: 'dealers', label: t.dealers, icon: 'fas fa-store' },
    { key: 'estates', label: t.estates, icon: 'fas fa-leaf' },
    { key: 'insurance', label: t.insurance, icon: 'fas fa-shield-alt' },
  ];

  const isSelected = (key) => selectedAudience === key;

  return (
    <section id="audience">
      <h2>{t.audienceTitle}</h2>
      <ul className="audience-list">
        {audienceItems.map((audience) => (
          <li
            key={audience.key}
            className={`audience-option ${isSelected(audience.key) ? 'selected' : ''}`}
            onClick={() => setSelectedAudience(audience.key)}
          >
            <div className="audience-card">
              <i className={audience.icon}></i>
              <span className={`audience-label ${isSelected(audience.key) ? 'visible' : 'hidden'}`}>
                {audience.label}
              </span>
              {isSelected(audience.key) && <span className="checkmark">✔️</span>}
            </div>
          </li>
        ))}
      </ul>

      {selectedAudience && (
        <button
          onClick={clearSelectedAudience}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            backgroundColor: '#cc0000',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          {t.clearSelection || 'Clear Selection'}
        </button>
      )}
    </section>
  );
}

export default Audience;
