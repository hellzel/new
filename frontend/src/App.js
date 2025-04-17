import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './contexts/languageContext';
import Header from './components/Header';
import About from './components/About';
import Services from './components/Services';
import Audience from './components/Audience';
import Contact from './components/Contact';
import SelectedServices from './components/SelectedServices';
import Footer from './components/Footer';
import './styles/Provenienssi.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  // which service's detail to show (same key)
  const [detailKey, setDetailKey] = useState(null);

  const handleServiceSelect = (key) => {
    setSelectedServices(prev => {
      // if already selected, deselect it
      if (prev.includes(key)) {
        setDetailKey(null);
        return prev.filter(k => k !== key);
      }
      // otherwise, limit to 3
      if (prev.length >= 3) return prev;
      setDetailKey(key);
      return [...prev, key];
    });
  };

  return (
    <LanguageProvider>
      <Router>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />

        <Routes>
          <Route path="/" element={<About />} />
          <Route
            path="/services"
            element={<Services onServiceSelect={handleServiceSelect} />}
          />
          <Route path="/audience" element={<Audience />} />
          <Route
            path="/contact"
            element={<Contact selectedServices={selectedServices} />}
          />
        </Routes>

        {selectedServices.length > 0 && (
          <SelectedServices
            selectedServices={selectedServices}
            detailKey={detailKey}
            onServiceDeselect={handleServiceSelect}
          />
        )}

        <Footer />
      </Router>
    </LanguageProvider>
  );
}

export default App;
