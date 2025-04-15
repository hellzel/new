import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/languageContext'; // Importing useLanguage hook

function Contact({ selectedServices }) {
  const [responseMessage, setResponseMessage] = useState("");
  const [message, setMessage] = useState("");
  const { language, translations } = useLanguage();
  const t = translations[language]; // Access translations based on selected language

  const [translatedServices, setTranslatedServices] = useState([]);

  // Wrap translateService in useCallback to memoize it
  const translateService = useCallback((service) => {
    switch (service) {
      case 'Item Evaluation':
        return t.service1Title;
      case 'Provenance Verification':
        return t.service2Title;
      case 'Buyer Bidding':
        return t.service3Title;
      case 'Auctions':
        return t.auctions;
      case 'Galleries':
        return t.galleries;
      case 'Collectors':
        return t.collectors;
      case 'Dealers':
        return t.dealers;
      case 'Estates':
        return t.estates;
      case 'Insurance Companies':
        return t.insurance;
      default:
        return service; // Return the service name if no translation found
    }
  }, [t]); // Add t as a dependency

  // Effect to translate selected services when language changes
  useEffect(() => {
    const translateSelectedServices = selectedServices.map(translateService);
    setTranslatedServices(translateSelectedServices);
  }, [language, selectedServices, translateService]); // Add translateService to the dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    formData.append("message", message);
    formData.append("services", translatedServices.join(", "));

    if (e.target.attachment.files[0]) {
      formData.append("attachment", e.target.attachment.files[0]);
    }

    try {
      const res = await fetch('http://localhost:3005/send-email', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        setResponseMessage(t.thankYouMessage);
        setMessage("");
      } else {
        setResponseMessage(`❌ ${t.errorMessage}: ${result.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      setResponseMessage(t.serverError);
      console.error(error);
    }
  };

  return (
    <section id="contact">
      <h2>{t.contactTitle}</h2>
      <form id="Contact" onSubmit={handleSubmit} autoComplete="on" encType="multipart/form-data">
        <input type="text" name="name" placeholder={t.namePlaceholder} required />
        <input type="email" name="email" placeholder={t.emailPlaceholder} required />
        <input
          type="text"
          name="phone"
          placeholder={t.phonePlaceholder}
          onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
          required
        />
        <textarea
          name="message"
          placeholder={t.messagePlaceholder}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        {translatedServices.length > 0 && (
          <div className="selected-services-preview">
            <label>{t.selectedServicesLabel}</label>
            <ul>
              {translatedServices.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Custom file input button */}
        <div className="file-input-container">
          <input
            type="file"
            name="attachment"
            accept="image/*"
            id="attachment"
            className="file-input"
            style={{ display: 'none' }}
          />
          <label htmlFor="attachment" className="file-input-label">{t.fileUploadLabel}</label>
        </div>

        <button type="submit">{t.submitButton}</button>
      </form>
      <p>{responseMessage}</p>
    </section>
  );
}

export default Contact;
