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
import './styles/Provenienssi.css';

// App content with routing logic
function AppContent() {
  const location = useLocation(); // Track current route
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [detailKey, setDetailKey] = useState(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

      {/* ✅ Only show this on /services */}
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

// Wrap it all with Router and Language context
function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;
