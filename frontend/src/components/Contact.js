import React, { useState } from 'react';

function Contact() {
  const [responseMessage, setResponseMessage] = useState('');
  const [phone, setPhone] = useState('');

  const handlePhoneChange = (e) => {
    const numbersOnly = e.target.value.replace(/[^0-9]/g, '');
    setPhone(numbersOnly);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", phone); // Use state value here
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
        <input
          type="text"
          name="phone"
          placeholder="Puhelinnumero"
          value={phone}
          onChange={handlePhoneChange}
          required
        />
        <textarea name="message" placeholder="Your Message" required />
        <input type="file" name="attachment" accept="image/*" />
        <button type="submit">Send Message</button>
      </form>
      <p>{responseMessage}</p>
    </section>
  );
}

export default Contact;
