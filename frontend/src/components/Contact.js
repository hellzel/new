import React, { useState } from 'react';

function Contact() {
  const [responseMessage, setResponseMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    formData.append("message", e.target.message.value);
    
    if (e.target.attachment.files[0]) {
      formData.append("attachment", e.target.attachment.files[0]);
    }

    try {
      const res = await fetch('http://localhost:3005/send-email', {
        method: 'POST',
        body: formData,
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
      <form id="Contact" onSubmit={handleSubmit} autoComplete="on" encType="multipart/form-data">
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <input type="tel" name="phone" placeholder="Your Phone Number" />
        <textarea name="message" placeholder="Your Message" required />
        <input type="file" name="attachment" accept="image/*" />
        <button type="submit">Send Message</button>
      </form>
      <p>{responseMessage}</p>
    </section>
  );
}

export default Contact;
