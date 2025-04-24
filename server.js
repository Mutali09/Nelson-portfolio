require('dotenv').config();
const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Verify environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error('Error: EMAIL_USER and EMAIL_PASS must be set in .env file');
  process.exit(1);
}

// Email transporter configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Verify email configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error with email configuration:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Rate limiting middleware - More lenient settings for development
const rateLimit = {};
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute instead of 1 hour
const MAX_REQUESTS = 10; // 10 requests per minute instead of 5 per hour

const checkRateLimit = (req, res, next) => {
  const ip = req.ip;
  const now = Date.now();

  if (!rateLimit[ip]) {
    rateLimit[ip] = {
      count: 1,
      timestamp: now
    };
  } else {
    if (now - rateLimit[ip].timestamp > RATE_LIMIT_WINDOW) {
      rateLimit[ip] = {
        count: 1,
        timestamp: now
      };
    } else {
      rateLimit[ip].count++;
      if (rateLimit[ip].count > MAX_REQUESTS) {
        console.log(`Rate limit exceeded for IP ${ip}`);
        return res.status(429).json({
          message: 'Too many requests. Please try again in a minute.'
        });
      }
    }
  }
  next();
};

// Contact form endpoint
app.post('/api/contact', checkRateLimit, async (req, res) => {
  try {
    console.log('Received contact form submission:', req.body);
    
    const { name, email, message } = req.body;

    // Basic validation
    if (!name || !email || !message) {
      console.log('Validation failed: Missing required fields');
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed: Invalid email format');
      return res.status(400).json({ message: 'Invalid email format' });
    }

    // Prepare email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Send to yourself
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    console.log('Sending notification email...');
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully');

    // Send confirmation email to the user
    const confirmationMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting me!',
      text: `Hi ${name},\n\nThank you for reaching out! I have received your message and will get back to you soon.\n\nBest regards,\nNelson`,
      html: `
        <h2>Thank you for contacting me!</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! I have received your message and will get back to you soon.</p>
        <p>Best regards,<br>Nelson</p>
      `
    };

    console.log('Sending confirmation email...');
    await transporter.sendMail(confirmationMailOptions);
    console.log('Confirmation email sent successfully');

    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ 
      message: 'Error sending message',
      error: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 