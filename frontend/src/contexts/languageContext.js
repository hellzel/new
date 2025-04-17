import React, { createContext, useContext, useState } from 'react';

// Create a Context for the language
const LanguageContext = createContext();

// Define translations for different languages
export const translations = {
  en: {
    // Header
    home: 'Home',
    services: 'Services',
    contact: 'Contact',
    language: 'Suomeksi',

    // About
    aboutTitle: 'Welcome to Provenienssi',
    aboutText: 'We are a leading expert in provenance verification, led by Maria Ekman-Kolari.',
    aboutUs: 'About Us',
    aboutUsText: 'At Provenienssi, we specialize in assessing the provenance of valuable items such as art, antiques, and collectibles. Our experienced experts provide thorough evaluation and historical documentation, ensuring transparency and authenticity for our clients.',
    meetMaria: 'Meet Maria Ekman-Kolari',
    mariaText: 'Maria is a recognized authority in the field of provenance research, bringing years of expertise in evaluating fine art and collectibles. Her dedication to the craft ensures clients receive the highest level of expertise and accuracy.',

    // Audience
    audienceTitle: 'Target Audiences',
    auctions: 'Auctions',
    galleries: 'Galleries',
    collectors: 'Collectors',
    dealers: 'Dealers',
    estates: 'Estates',
    insurance: 'Insurance Companies',

    // Contact
    contactTitle: 'Contact Us',
    namePlaceholder: 'Your Name',
    emailPlaceholder: 'Your Email',
    phonePlaceholder: 'Phone Number',
    messagePlaceholder: 'Write your message here...',
    selectedServicesLabel: 'Selected Services:',
    submitButton: 'Send Message',
    thankYouMessage: 'Thank you! Your message has been sent.',
    errorMessage: 'Unknown error occurred.',
    serverError: 'Could not connect to server.',
    fileUploadLabel: 'Choose file',

    // Footer
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    addressValue: 'Museokatu 10, 00100 Helsinki, Finland',
    allRightsReserved: 'All Rights Reserved',

    // SelectedServices
    selectedServicesTitle: 'Selected Services',
    serviceDetailsTitle: 'Service Details',

    // Services
    servicesTitle: 'Our Services',
    service1Title: 'Item Evaluation',
    service1Desc: 'Get a professional evaluation of your valuable items.',
    service1Detail: `Do you want to know the monetary value of your design piece,
                    art glass, ceramic, fine art or other collectible? \n\n Our experts,
                    with years of experience in auctions, estates, collectors,
                    dealers and insurance valuations, will give you an accurate appraisal.`,

    service2Title: 'Provenance Verification',
    service2Desc: 'We research and verify the history and authenticity of your items.',
    service2Detail: `We can authenticate the origin of your items, document their
                      ownership history, and provide you with a condition report.`,

    service3Title: 'Buyer Bidding',
    service3Desc: 'We help connect sellers and buyers through competitive bidding.',
    service3Detail: `Auction your items in a competitive environment. We handle
                      everything from setup to bidding through to final sale.`,
  },

  fi: {
    // Header
    home: 'Etusivu',
    services: 'Palvelut',
    contact: 'Yhteystiedot',
    language: 'In English',

    // About
    aboutTitle: 'Tervetuloa Provenienssiin',
    aboutText: 'Olemme johtava alkuperäselvityksen asiantuntija, jota johtaa Maria Ekman-Kolari.',
    aboutUs: 'Meistä',
    aboutUsText: 'Provenienssissa erikoistumme arvokkaiden esineiden, kuten taiteen, antiikin ja keräilyesineiden alkuperän arviointiin. Kokeneet asiantuntijamme tarjoavat perusteellisia arviointeja ja historiallista dokumentointia, varmistaen läpinäkyvyyden ja aitouden asiakkaillemme.',
    meetMaria: 'Tutustu Maria Ekman-Kolariin',
    mariaText: 'Maria on tunnustettu asiantuntija alkuperäselvityksessä, ja hänellä on vuosien kokemus taiteen ja keräilyesineiden arvioinnista. Hänen omistautumisensa varmistaa, että asiakkaat saavat asiantuntevinta ja tarkinta palvelua.',

    // Audience
    audienceTitle: 'Kohderyhmät',
    auctions: 'Huutokaupat',
    galleries: 'Galleriat',
    collectors: 'Keräilijät',
    dealers: 'Kauppiaat',
    estates: 'Kuolinpesät',
    insurance: 'Vakuutusyhtiöt',

    // Contact
    contactTitle: 'Ota yhteyttä',
    namePlaceholder: 'Nimesi',
    emailPlaceholder: 'Sähköposti',
    phonePlaceholder: 'Puhelinnumero',
    messagePlaceholder: 'Kirjoita viestisi tähän...',
    selectedServicesLabel: 'Valitut palvelut:',
    submitButton: 'Lähetä viesti',
    thankYouMessage: 'Kiitos! Viestisi on lähetetty.',
    errorMessage: 'Tuntematon virhe.',
    serverError: 'Yhteyteen ei saatu yhteyttä.',
    fileUploadLabel: 'Valitse tiedosto',

    // Footer
    email: 'Sähköposti',
    phone: 'Puhelin',
    address: 'Osoite',
    addressValue: 'Museokatu 10, 00100 Helsinki, Suomi',
    allRightsReserved: 'Kaikki oikeudet pidätetään.',

    // SelectedServices
    selectedServicesTitle: 'Valitut palvelut',
    serviceDetailsTitle: 'Palvelun tiedot',

    // Services
    servicesTitle: 'Palvelumme',
    service1Title: 'Esineiden arviointi',
    service1Desc: 'Hanki ammatillinen arviointi arvokkaista esineistäsi.',
    service1Detail: `Haluatko tietää omistamasi designesineen, taidelasin,
keramiikan, arvotaiteen tai muun arvoesineen rahallisen arvon? \n\n
Kokeneet asiantuntijamme arvioivat esineitä vuosien kokemuksella
mm. huutokauppojen, kuolinpesien, keräilijöiden, kauppiaiden ja
vakuutusyhtiöiden tarpeisiin.`,

    service2Title: 'Alkuperän varmistus',
    service2Desc: 'Selvitämme ja varmistamme esineiden historian ja aitouden.',
    service2Detail: `Voimme todentaa esineiden alkuperän, dokumentoida niiden
omistushistorian sekä laatia kunto‑arvion.`,

    service3Title: 'Ostajan huutokauppa',
    service3Desc: 'Autamme yhdistämään myyjät ja ostajat kilpailullisen huutokaupan kautta.',
    service3Detail: `Autamme järjestämään huutokaupan, jossa myyjät ja ostajat
kilpailevat esineistäsi aina aloituksesta kauppaan asti.`,
  },
};

// LanguageProvider component to wrap the app and provide language state
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('fi'); // Default language is Finnish

  const toggleLanguage = () => {
    setLanguage((prevLanguage) => (prevLanguage === 'fi' ? 'en' : 'fi'));
  };

  return (
    <LanguageContext.Provider value={{ language, translations, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  return useContext(LanguageContext);
}
