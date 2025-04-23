import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { LanguageProvider } from './contexts/languageContext';
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

  // ← **Single source of truth** for selected services:
  const [selectedServices, setSelectedServices] = useState([]);
  const [detailKey, setDetailKey] = useState(null);

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

  return (
    <>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />

      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/about" element={<About />} />

        {/* Pass both the array and the toggle function */}
        <Route
          path="/services"
          element={
            <Services
              selectedServices={selectedServices}
              onServiceSelect={handleServiceSelect}
            />
          }
        />

        <Route path="/audience" element={<Audience />} />
        <Route path="/contact" element={<Contact selectedServices={selectedServices} />} />
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
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}
