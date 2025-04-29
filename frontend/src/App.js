import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/languageContext';
import { SelectedAudienceProvider, useSelectedAudience } from './contexts/selectedAudienceContext'; // Import context
import Header from './components/Header';
import About from './components/About';
import Services from './components/Services';
import Audience from './components/Audience';
import Contact from './components/Contact';
import SelectedServices from './components/SelectedServices';
import Footer from './components/Footer';
import HeroSection from './components/hero/HeroSection';
import './styles/Provenienssi.css';

function AppContent() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // **Single source of truth** for selected services and audience
  const { selectedAudience, setSelectedAudience } = useSelectedAudience(); // Use context here
  const [selectedServices, setSelectedServices] = useState([]);
  const [detailKey, setDetailKey] = useState(null);

  // Update session storage when selectedAudience changes
  useEffect(() => {
    if (selectedAudience !== null) {
      console.log("AppContent: Setting selectedAudience to sessionStorage:", selectedAudience);
      sessionStorage.setItem('selectedAudience', selectedAudience);
    }
  }, [selectedAudience]);

  const toggleMenu = () => setMenuOpen(o => !o);

  const handleServiceSelect = (key) => {
    setSelectedServices(prev => {
      if (prev.includes(key)) {
        setDetailKey(null);
        return prev.filter(k => k !== key);
      }
      if (prev.length >= 3) return prev;
      setDetailKey(key);
      return [...prev, key];
    });
  };

  const handleAudienceSelect = (audience) => {
    console.log("AppContent: Audience selected:", audience); 
    setSelectedAudience(audience);  // Update the selectedAudience state
  };

  console.log("AppContent: Rendering with selectedAudience:", selectedAudience); 

  return (
    <>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/services"
          element={
            <Services
              selectedServices={selectedServices}
              onServiceSelect={handleServiceSelect}
              onAudienceSelect={handleAudienceSelect} 
            />
          }
        />
        <Route
          path="/audience"
          element={
            <Audience
              onAudienceSelect={handleAudienceSelect}
              selectedAudience={selectedAudience}  
            />
          }
        />
        <Route
          path="/contact"
          element={
            <Contact
              selectedServices={selectedServices}
              selectedAudience={selectedAudience}  
            />
          }
        />
      </Routes>

      {location.pathname === '/services' && selectedServices.length > 0 && (
        <SelectedServices
          selectedServices={selectedServices}
          detailKey={detailKey}
          onServiceDeselect={handleServiceSelect}
        />
      )}

      <Footer />
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <SelectedAudienceProvider>  {/* Wrap the app content with the provider */}
        <Router>
          <AppContent />
        </Router>
      </SelectedAudienceProvider>
    </LanguageProvider>
  );
}
