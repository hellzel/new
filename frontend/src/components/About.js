import React from 'react';
import { useLanguage } from '../contexts/languageContext';
import FadeInSection from './FadeInSection';
import museumImage from '../images/museum.jpg';

function About() {
  const { language, translations } = useLanguage();
  const t = translations[language] || translations['fi'];

  // Split the aboutUsText on double-newline into paragraphs
  const aboutParas = t.aboutUsText.split('\n\n');

  return (
    <FadeInSection>
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-content">
            <h2 className="about-title">{t.aboutTitle}</h2>
            <p className="about-text">{t.aboutText}</p>

            <div className="about-details">
              <h3 className="about-subtitle">{t.aboutUs}</h3>
              {aboutParas.map((para, idx) => (
                <p key={idx} className="about-description">
                  {para}
                </p>
              ))}
            </div>
          </div>

          <div className="about-image-container">
            <img
              src={museumImage}
              alt="Museum representing provenance work"
              className="about-image"
            />
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}

export default About;
