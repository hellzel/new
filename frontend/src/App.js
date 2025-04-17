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
  // Holds the keys of the services: 'service1', 'service2', 'service3'
  const [selectedServices, setSelectedServices] = useState([]);
  // Which one’s detail to show
  const [detailKey, setDetailKey] = useState(null);

  const handleServiceSelect = (key) => {
    setSelectedServices(prev => {
      if (prev.includes(key)) {
        // deselect
        setDetailKey(null);
        return prev.filter(k => k !== key);
      }
      // limit to 3
      if (prev.length >= 3) return prev;
      setDetailKey(key);
      return [...prev, key];
    });
  };

  return (
    <LanguageProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/services" element={<Services onServiceSelect={handleServiceSelect} />} />
          <Route path="/audience" element={<Audience />} />
          <Route path="/contact" element={<Contact selectedServices={selectedServices} />} />
        </Routes>
        {selectedServices.length > 0 && (
          <SelectedServices
            selectedServices={selectedServices}
            detailKey={detailKey}
          />
        )}
        <Footer />
      </Router>
    </LanguageProvider>
  );
}

export default App;
