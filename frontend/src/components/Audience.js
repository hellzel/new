import React from 'react';

function Audience() {
  return (
    <section id="audience">
      <h2>Kohderyhmät</h2>
      <ul className="audience-list">
        <li><i className="fas fa-gavel"></i> Huutokaupat</li>
        <li><i className="fas fa-palette"></i> Galleriat</li>
        <li><i className="fas fa-gem"></i> Keräilijät</li>
        <li><i className="fas fa-store"></i> Kauppiaat</li>
        <li><i className="fas fa-leaf"></i> Kuolinpesät</li>
        <li><i className="fas fa-shield-alt"></i> Vakuutusyhtiöt</li>
      </ul>
    </section>
  );
}

export default Audience;