import React, { useState } from 'react';

function Contact({ selectedServices }) {
  const [responseMessage, setResponseMessage] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", e.target.name.value);
    formData.append("email", e.target.email.value);
    formData.append("phone", e.target.phone.value);
    formData.append("message", message);
    formData.append("services", selectedServices.join(", "));

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
        setMessage("");
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
          placeholder="Phone Number"
          onInput={(e) => e.target.value = e.target.value.replace(/[^0-9]/g, '')}
          required
        />
        <textarea
          name="message"
          placeholder="Write your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
        />
        {selectedServices.length > 0 && (
          <div className="selected-services-preview">
            <label>Selected Services:</label>
            <ul>
              {selectedServices.map((service, index) => (
                <li key={index}>{service}</li>
              ))}
            </ul>
          </div>
        )}
        <input type="file" name="attachment" accept="image/*" />
        <button type="submit">Send Message</button>
      </form>
      <p>{responseMessage}</p>
    </section>
  );
}

export default Contact;
