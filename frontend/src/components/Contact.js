import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../contexts/languageContext';
import { useSelectedAudience } from '../contexts/selectedAudienceContext'; // Import context hook
import FadeInSection from './FadeInSection';

function Contact({ selectedServices }) {
  const [responseMessage, setResponseMessage] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { language, translations } = useLanguage();
  const { selectedAudience } = useSelectedAudience(); // Get selected audience from context
  const t = translations[language];

  // Log selected audience and services to see if they are passed correctly
  console.log("Selected Audience in Contact:", selectedAudience);
  console.log("Selected Services in Contact:", selectedServices);

  // Helper function to translate service keys
  const translateKey = useCallback((key) => {
    switch (key) {
      case 'service1': return t.service1Title;
      case 'service2': return t.service2Title;
      case 'service3': return t.service3Title;
      default: return key;
    }
  }, [t]);

  // Translates selected services
  const [translatedServices, setTranslatedServices] = useState([]);
  useEffect(() => {
    console.log("Translating selected services...");
    setTranslatedServices(selectedServices.map(translateKey));
  }, [selectedServices, translateKey]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted. Preparing data...");

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    formData.append("message", message);
    formData.append("services", translatedServices.join(", "));
    formData.append("audience", selectedAudience); // Include selected audience in the form data
    if (selectedFile) formData.append("attachment", selectedFile);

    try {
      const res = await fetch('http://localhost:3005/send-email', {
        method: 'POST',
        body: formData,
      });
      const result = await res.json();
      console.log("Email send response:", result);
      
      if (res.ok) {
        setResponseMessage(t.thankYouMessage);
        setMessage("");
        setSelectedFile(null);
      } else {
        setResponseMessage(`❌ ${t.errorMessage}: ${result.error || 'Unknown error'}`);
      }
    } catch (err) {
      console.error("Error during email send:", err);
      setResponseMessage(t.serverError);
    }
  };

  return (
    <FadeInSection>
      <section id="contact" className="contact-section">
        <h2>{t.contactTitle}</h2>
        <div className="contact-grid">
          <form onSubmit={handleSubmit} encType="multipart/form-data" autoComplete="on">
            <input type="text" name="name" placeholder={t.namePlaceholder} required />
            <input type="email" name="email" placeholder={t.emailPlaceholder} required />
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

            {selectedAudience && (
              <div className="selected-audience-preview">
                <label>{t.selectedAudienceLabel}</label>
                <p className="audience-text">{t[selectedAudience]}</p>
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
            {responseMessage && <p>{responseMessage}</p>}
          </form>

          <div className="opening-hours">
            <h3>{t.openingHoursTitle}</h3>
            
            <ul>
              <li><strong>{t.openingHoursDays.mondayFriday}:</strong> {t.openingHoursTimes.weekday}</li>
              <li><strong>{t.openingHoursDays.saturday}:</strong> {t.openingHoursTimes.saturday}</li>
              <li><strong>{t.openingHoursDays.sunday}:</strong> {t.openingHoursTimes.sunday}</li>
            </ul>
            <br></br>
            <br></br>
            <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d166.42583574484317!2d22.243403183445846!3d60.44062878900584!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x468c77dad65f7a2f%3A0xc4c791d4536b4d9f!2sMinerva!5e1!3m2!1sfi!2sfi!4v1746010098294!5m2!1sfi!2sfi" title="location"width="300" height="300" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>
    </FadeInSection>
  );
}

export default Contact;
