require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const multer = require('multer');

const app = express();
const port = 3005;

app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

const storage = multer.memoryStorage();
const upload = multer({ storage });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.get('/test', (req, res) => {
  res.send('✅ Backend is working!');
});

app.post('/send-email', upload.single('attachment'), (req, res) => {
  console.log('📬 POST /send-email route hit');
  const { name, email, phone, message, services } = req.body;
  const file = req.file;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  const formattedServices = (services || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean)
    .map(s => `• ${s}`)
    .join('<br>');

  const formattedMessage = message.replace(/\n/g, '<br>');

  const mailOptions = {
    from: `${name} <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `Message from ${name} - Provenienssi Contact Form`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone || 'N/A'}</p>
      <p><strong>Selected Services:</strong></p>
      <ul>
        ${services
          ? services.split(',').map(s => `<li>${s.trim()}</li>`).join('')
          : '<li>None selected</li>'}
      </ul>
      <p><strong>Message:</strong></p>
      <p>${message.replace(/\n/g, '<br>')}</p>
    `,
    attachments: file
      ? [{
          filename: file.originalname,
          content: file.buffer,
          contentType: file.mimetype,
        }]
      : [],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('❌ Error sending email:', error);
      return res.status(500).json({ error: 'Failed to send email', details: error.toString() });
    }

    console.log('✅ Email sent:', info.response);
    res.status(200).json({ message: 'Email sent successfully', info });
  });
});

app.use((err, req, res, next) => {
  console.error('🔥 Unhandled error:', err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
