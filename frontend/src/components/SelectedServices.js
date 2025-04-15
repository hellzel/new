import React from 'react';
import { useLanguage } from '../contexts/languageContext';  // Importing useLanguage hook

function SelectedServices({ selectedServices, serviceDetails }) {
  const { language, translations } = useLanguage();
  const t = translations[language];  // Access translations based on selected language

  // Render selected services with service details
  return (
    <section id="selected-services">
      <h2>{t.selectedServicesTitle}</h2>
      <div id="selected-services-list">
        {selectedServices.length > 0 ? (
          selectedServices.map((service, index) => (
            <div key={index} className="selected-service">
              <div className="circle"></div>
              <span>{service}</span>
            </div>
          ))
        ) : (
          <p>{t.noSelectedServices}</p>
        )}
      </div>

      <div id="service-details" className="service-details">
        {serviceDetails && serviceDetails !== "" ? (
          <div>
            <h3>{t.serviceDetailsTitle}</h3>
            <div id="service-info">
              {serviceDetails.split("\n").map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
        ) : (
          <p>{t.noServiceDetails}</p>  // Placeholder if no details available
        )}
      </div>
    </section>
  );
}

export default SelectedServices;
