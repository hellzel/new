import React, { useState } from 'react';

function Contact() {
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };
  
    try {
      const res = await fetch('http://localhost:3005/send-email', {  // Target the correct backend URL
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      const result = await res.json();
  
      if (res.ok) {
        setResponseMessage("✅ Thank you! Your message has been sent.");
      } else {
        setResponseMessage(`❌ Error: ${result.error || 'Unknown error occurred'}`);
      }
    } catch (error) {
      setResponseMessage("❌ Could not connect to server.");
      console.error(error);
    }
  };  

  return (
    <section id="contact">
      <h2>Contact Us</h2>
      <form id="Contact" onSubmit={handleSubmit} autoComplete="on">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required />
        <button type="submit">Send Message</button>
      </form>
      <p>{responseMessage}</p>
    </section>
  );
}

export default Contact;
