// src/components/Contact.js
import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/languageContext';
import FadeInSection from './FadeInSection';

function Contact({ selectedServices }) {
  const [responseMessage, setResponseMessage] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { language, translations } = useLanguage();
  const t = translations[language];

  // Map your keys (service1/service2/service3) → the translated titles
  const translateKey = useCallback((key) => {
    switch (key) {
      case 'service1': return t.service1Title;
      case 'service2': return t.service2Title;
      case 'service3': return t.service3Title;
      default: return key;
    }
  }, [t]);

  // Keep an array of display‑friendly names
  const [translatedServices, setTranslatedServices] = useState([]);
  useEffect(() => {
    setTranslatedServices(selectedServices.map(translateKey));
  }, [selectedServices, translateKey]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    formData.append("message", message);
    formData.append("services", translatedServices.join(", "));
    if (selectedFile) formData.append("attachment", selectedFile);

    try {
      const res = await fetch('http://localhost:3005/send-email', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      if (res.ok) {
        setResponseMessage(t.thankYouMessage);
        setMessage("");
        setSelectedFile(null);
      } else {
        setResponseMessage(`❌ ${t.errorMessage}: ${result.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(err);
      setResponseMessage(t.serverError);
    }
  };

  return (
    <FadeInSection>
      <section id="contact">
        <h2>{t.contactTitle}</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="on">
          <input type="text"   name="name"    placeholder={t.namePlaceholder}    required />
          <input type="email"  name="email"   placeholder={t.emailPlaceholder}   required />
          <input
            type="text"
            name="phone"
            placeholder={t.phonePlaceholder}
            onInput={e => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
            required
          />
          <textarea
            name="message"
            placeholder={t.messagePlaceholder}
            value={message}
            onChange={e => setMessage(e.target.value)}
            required
          />

          {translatedServices.length > 0 && (
            <div className="selected-services-preview">
              <label>{t.selectedServicesLabel}</label>
              <ul>
                {translatedServices.map((svc, i) => <li key={i}>{svc}</li>)}
              </ul>
            </div>
          )}

          <div className="file-input-container">
            <input
              id="attachment"
              type="file"
              name="attachment"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="attachment" className="file-input-label">
              {selectedFile ? (t.changeFileLabel || "Change file") : t.fileUploadLabel}
            </label>
            {selectedFile && <p className="file-name">{selectedFile.name}</p>}
          </div>

          <button type="submit">{t.submitButton}</button>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
      </section>
    </FadeInSection>
  );
}

export default Contact;
