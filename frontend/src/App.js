import React, { useState } from 'react';
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
      "Esineiden arviointi": "Haluatko tietää omistamasi designesineen, taidelasin, keramiikan, arvotaiteen tai muun arvoesineen rahallisen arvon?",
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
    <div>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <Services onServiceSelect={handleServiceSelect} />
      <SelectedServices selectedServices={selectedServices} serviceDetails={serviceDetails} />
      <About />
      <Audience />
      <Contact selectedServices={selectedServices} />
      <Footer />
    </div>
  );
}

export default App;
