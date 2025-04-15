import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Contact from './components/Contact';
import Services from './components/Services';
import SelectedServices from './components/SelectedServices';
import About from './components/About';
import Audience from './components/Audience';
import Footer from './components/Footer';
import './styles/Provenienssi.css';

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState("");

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleServiceSelect = (service) => {
    const descriptions = {
      "Esineiden arviointi": "Haluatko tietää omistamasi designesineen, taidelasin, keramiikan, arvotaiteen tai muun arvoesineen rahallisen arvon?\nKokeneet asiantuntijamme arvioivat esineitä vuosien kokemuksella mm. huutokauppojen, kuolinpesien, keräilijöiden, kauppiaiden ja vakuutusyhtiöiden tarpeisiin.",
      "Alkuperän varmistus": "Voimme todentaa esineiden alkuperän, dokumentoida niiden omistushistorian sekä laatia kunto-arvion.",
      "Buyer Bidding": "Auction your items in a competitive environment. We handle everything from setup to bidding."
    };

    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        setServiceDetails(""); 
        return prev.filter(s => s !== service);
      } else {
        setServiceDetails(descriptions[service]);
        return [...prev, service];
      }
    });
  };

  return (
    <Router>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />
      
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/services" element={<Services onServiceSelect={handleServiceSelect} />} />
        <Route path="/audience" element={<Audience />} />
        <Route path="/contact" element={<Contact selectedServices={selectedServices} />} />
      </Routes>

      {/* The selected services component should be shown on relevant pages */}
      {selectedServices.length > 0 && <SelectedServices selectedServices={selectedServices} serviceDetails={serviceDetails} />}
      
      <Footer />
    </Router>
  );
}

export default App;
