import React from 'react';

function SelectedServices({ selectedServices, serviceDetails }) {
  return (
    <section id="selected-services">
      <h2>Selected Services</h2>
      <div id="selected-services-list">
        {selectedServices.map((service, index) => (
          <div key={index} className="selected-service">
            <div className="circle"></div>
            <span>{service}</span>
          </div>
        ))}
      </div>
      <div id="service-details" className="service-details">
        <h3>Service Details</h3>
        <div id="service-info">{serviceDetails}</div>
      </div>
    </section>
  );
}

export default SelectedServices;
