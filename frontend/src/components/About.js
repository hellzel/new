import React from 'react';
import museumImage from '../images/museum.jpg'; // Adjust path based on your folder structure

function About() {
  return (
    <section id="about">
      <div className="about-container">
        <h2>Welcome to Provenienssi</h2>
        <p className="intro-text">
          We are a leading expert in provenance verification, led by Maria Ekman-Kolari.
        </p>
        
        <img src={museumImage} alt="Museum representing provenance work" className="about-img" />
        
        <div className="about-details">
          <h3>About Us</h3>
          <p>
            At Provenienssi, we specialize in assessing the provenance of valuable items such as art,
            antiques, and collectibles. Our experienced experts provide thorough evaluation and
            historical documentation, ensuring transparency and authenticity for our clients.
          </p>
        </div>
        
        <div className="team-info">
          <h3>Meet Maria Ekman-Kolari</h3>
          <p>
            Maria is a recognized authority in the field of provenance research, bringing years of
            expertise in evaluating fine art and collectibles. Her dedication to the craft ensures
            clients receive the highest level of expertise and accuracy.
          </p>
        </div>
      </div>
    </section>
  );
}

export default About;
