import React from 'react';
import { useLanguage } from '../contexts/languageContext';

function Audience({ onAudienceSelect, selectedAudience }) {
  const { language, translations } = useLanguage();
  const t = translations[language];

  // Define the audience items, including their key, label, and icon.
  const audienceItems = [
    { key: 'auctions', label: t.auctions, icon: 'fas fa-gavel' },
    { key: 'galleries', label: t.galleries, icon: 'fas fa-palette' },
    { key: 'collectors', label: t.collectors, icon: 'fas fa-gem' },
    { key: 'dealers', label: t.dealers, icon: 'fas fa-store' },
    { key: 'estates', label: t.estates, icon: 'fas fa-leaf' },
    { key: 'insurance', label: t.insurance, icon: 'fas fa-shield-alt' },
  ];

  // Check if the current item is selected based on its key
  const isSelected = (key) => selectedAudience === key;

  return (
    <section id="audience">
      <h2>{t.audienceTitle}</h2>
      <ul className="audience-list">
        {audienceItems.map((audience) => (
          <li
            key={audience.key}
            className={`audience-option ${isSelected(audience.key) ? 'selected' : ''}`} // Apply the 'selected' class if the item is selected
            onClick={() => onAudienceSelect(audience.key)} // When an item is clicked, call onAudienceSelect with the key
          >
            <i className={audience.icon}></i> {audience.label}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Audience;
