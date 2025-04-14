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
    console.log("Selected service:", service);  // Debugging line
    const newSelectedServices = [...selectedServices];
    const newServiceDetails = {
      "Esineiden arviointi": "Haluatko tietää omistamasi designesineen, taidelasin, keramiikan, arvotaiteen tai muun arvoesineen rahallisen arvon?\n\nKokeneet asiantuntijamme arvioivat esineitä vuosien kokemuksella mm. huutokauppojen, kuolinpesien, keräilijöiden, kauppiaiden ja vakuutusyhtiöiden tarpeisiin.",
      "Alkuperän varmistus": "Tarpeestasi riippuen, voimme myös todentaa esineiden alkuperän, dokumentoida niiden omistushistorian sekä laatia kirjallisen kunto-arvion.",
      "Buyer Bidding": "Our buyer bidding service allows sellers to auction their items in a competitive environment. We facilitate the entire process, from setting up the auction to managing bids and securing the best prices."
    };

    if (newSelectedServices.includes(service)) {
      const index = newSelectedServices.indexOf(service);
      newSelectedServices.splice(index, 1);
      setSelectedServices(newSelectedServices);
      setServiceDetails("");
    } else {
      newSelectedServices.push(service);
      setSelectedServices(newSelectedServices);
      setServiceDetails(newServiceDetails[service]);
    }

    console.log("Updated service details:", newServiceDetails[service]);  // Debugging line
  };

  return (
    <div>
      <Header menuOpen={menuOpen} toggleMenu={toggleMenu} />
      <Services onServiceSelect={handleServiceSelect} />
      <SelectedServices selectedServices={selectedServices} serviceDetails={serviceDetails} />
      <About />
      <Audience />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
