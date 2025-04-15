import React from 'react';
import { useLanguage } from '../contexts/languageContext';
import museumImage from '../images/museum.jpg';

function About() {
  const { language, translations } = useLanguage();
  const t = translations[language] || translations['fi'];  // Default to 'fi' if translations are missing

  return (
    <section id="about">
      <div className="about-container">
        <h2>{t.aboutTitle}</h2>
        <p className="intro-text">{t.aboutText}</p>
        
        <img src={museumImage} alt="Museum representing provenance work" className="about-img" />
        
        <div className="about-details">
          <h3>{t.aboutUs}</h3>
          <p>{t.aboutUsText}</p>
        </div>
        
        <div className="team-info">
          <h3>{t.meetMaria}</h3>
          <p>{t.mariaText}</p>
        </div>
      </div>
    </section>
  );
}

export default About;
