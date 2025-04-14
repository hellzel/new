require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3005;

// ✅ CORS settings to allow frontend from port 3000
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

// ✅ Use JSON parser for basic POST requests
app.use(express.json());

// ✅ Multer setup for handling file uploads (memory storage for sending as email)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ Nodemailer transporter setup (Gmail with App Password)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Test route (optional)
app.get('/test', (req, res) => {
  res.send('✅ Backend is working!');
});

// ✅ Contact form POST route with attachment
app.post('/send-email', upload.single('attachment'), (req, res) => {
  console.log('📬 POST /send-email route hit');
  const { name, email, phone, message } = req.body;
  const file = req.file;

  console.log('Form data:', { name, email, phone, message });
  if (file) {
    console.log(`📎 Received file: ${file.originalname} (${file.mimetype})`);
  }

  if (!name || !email || !message) {
    console.log('❌ Missing required fields');
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  // Build mail options
  const mailOptions = {
    from: `${name} <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Message from ${name} - Provenienssi Contact Form`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Message:</strong><br>${message}</p>
    `,
    attachments: file ? [{
      filename: file.originalname,
      content: file.buffer,
      contentType: file.mimetype,
    }] : [],
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error.toString() });
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
