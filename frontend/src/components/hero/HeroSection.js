import React from 'react';
import vintageCollection from '../../images/vintage-collection.jpg';
import './Hero.css';
import { useLanguage } from '../../contexts/languageContext';

function HeroSection() {
  const { language, translations } = useLanguage();
  const t = translations[language];

  return (
    <section className="hero">
      <div className="hero-content">
        <h1>{t.heroHeadline}</h1>
        <p>{t.heroSubtext}</p>
        <div className="hero-buttons">
          <a href="/about" className="hero-btn primary">{t.heroGetStarted}</a>
          <a href="/services" className="hero-btn secondary">{t.heroHowItWorks}</a>
        </div>
      </div>
      <div className="hero-visual">
        <img
          src={vintageCollection}
          alt="Vintage items"
          className="floating-img"
        />
      </div>
    </section>
  );
}

export default HeroSection;
