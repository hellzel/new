import React from 'react';

function SelectedServices({ selectedServices, serviceDetails }) {
  console.log("Rendering SelectedServices, serviceDetails:", serviceDetails);  // Debugging line

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
        {serviceDetails && (
          <div>
            <h3>Service Details</h3>
            <div id="service-info">
              {serviceDetails.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default SelectedServices;
