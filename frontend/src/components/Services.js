import React from 'react';

function Services({ onServiceSelect }) {
  return (
    <section id="services">
      <h2>Our Services</h2>
      <div className="services-container">
        <div className="service service-option" onClick={() => onServiceSelect("Esineiden arviointi")}>
          <h3>Esineiden arviointi</h3>
          <p>Get a professional evaluation of your valuable items.</p>
        </div>
        <div className="service service-option" onClick={() => onServiceSelect("Alkuperän varmistus")}>
          <h3>Alkuperän varmistus</h3>
          <p>We research and verify the history and authenticity of your items.</p>
        </div>
        <div className="service service-option" onClick={() => onServiceSelect("Buyer Bidding")}>
          <h3>Buyer Bidding</h3>
          <p>We help connect sellers and buyers through competitive bidding.</p>
        </div>
      </div>
    </section>
  );
}

export default Services;
