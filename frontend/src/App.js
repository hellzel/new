import React, { useState } from 'react';
import Header from './components/Header';
import Contact from './components/Contact';
import Services from './components/Services';
import SelectedServices from './components/SelectedServices';
import About from './components/About';
import Audience from './components/Audience';
import Footer from './components/Footer';
import './styles/Provenienssi.css'; // Import your CSS file

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [serviceDetails, setServiceDetails] = useState("");

  // Toggle the navigation menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  // Handle service selection
  const handleServiceSelect = (service) => {
    const newSelectedServices = [...selectedServices];
    const newServiceDetails = {
      "Item Evaluation": "Our item evaluation service provides an expert assessment of your valuable items. Whether it's artwork, antiques, or collectibles, we ensure that every detail is carefully evaluated.",
      "Provenance Verification": "Provenance verification is a detailed research process where we track the ownership history of your item to ensure its authenticity. We provide full reports on its background and value.",
      "Buyer Bidding": "Our buyer bidding service allows sellers to auction their items in a competitive environment. We facilitate the entire process, from setting up the auction to managing bids and securing the best prices."
    };

    if (newSelectedServices.includes(service)) {
      // Remove service from the selection
      const index = newSelectedServices.indexOf(service);
      newSelectedServices.splice(index, 1);
      setSelectedServices(newSelectedServices);
      setServiceDetails("");
    } else {
      // Add service to the selection
      newSelectedServices.push(service);
      setSelectedServices(newSelectedServices);
      setServiceDetails(newServiceDetails[service]);
    }
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
