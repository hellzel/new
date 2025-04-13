require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3005;

// ✅ CORS settings to allow frontend from port 3000
app.use(cors({
  origin: 'http://localhost:3000',  // Allow only localhost:3000
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// ✅ Parse incoming JSON
app.use(express.json());

// ✅ Nodemailer transporter setup (Gmail with App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // Your Gmail
    pass: process.env.EMAIL_PASS,     // App password from Google
  },
});

// ✅ Test route (optional)
app.get('/test', (req, res) => {
  res.send('✅ Backend is working!');
});

// ✅ Contact form POST route
app.post('/send-email', (req, res) => {
  console.log('📬 POST /send-email route hit');
  console.log('Request body:', req.body);

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    console.log('❌ Missing required fields');
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const mailOptions = {
    from: `${name} <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Message from ${name} - Provenienssi Contact Form`,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error sending email:', error);
      return res.status(500).json({
        error: 'Failed to send email',
        details: error.toString(),
      });
    }

    console.log('✅ Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

// ✅ Global error handler
app.use((err, req, res, next) => {
  console.error('🔥 Unhandled error:', err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
