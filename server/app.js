const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Nodemailer transporter setup
const transporter = nodemailer.createTransport({
  service: 'Gmail', // Or your email service
  auth: {
    user: 'sachinkc4456@gmail.com',
    pass: 'wuqq bswz avag toor',
  },
});

app.post('/send-email', (req, res) => {
  const { email } = req.body;

  // Email details
  const mailOptions = {
    from: '"GDG CUJ" sachinkc4456@gmail.com',
    to: email,
    subject: 'Thank you for subscribing!',
    html: `
      <div style="text-align: center; font-family: Arial, sans-serif;">
        <h2>Welcome to GDG CUJ Newsletter!</h2>
        <p>We appreciate your interest in staying updated with our events and updates.</p>
        <p>You will now receive our latest news, tutorials, and insights right in your inbox!</p>
        <p>Feel free to explore more on our <a href="https://gdgcuj.com" target="_blank" style="color: #ff6f61; text-decoration: none;">website</a>.</p>
        <br>
        <p style="font-size: 0.9em; color: #666;">If you did not subscribe to this newsletter, please ignore this email.</p>
      </div>
    `,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).send('Failed to send email');
    }
    console.log(`Email sent: ${info.response}`);
    res.status(200).send('Email sent successfully');
  });
});

app.listen(PORT, () => {
  console.log('Server is running on port ${PORT}');
});


app.post('/feedback', (req, res) => {
  const { name, email, message } = req.body; // Feedback form data

  // Mail to user (Acknowledgment)
  const userMailOptions = {
    from: '"GDG CUJ" sachinkc4456@gmail.com', // Sender's email
    to: email, // User's email
    subject: 'Thank You for Your Feedback!',
    html: `
      <h1>Hi ${name},</h1>
      <p>Thank you for your valuable feedback! Here is what you shared with us:</p>
      <blockquote>${message}</blockquote>
      <p>We truly appreciate your time and effort in helping us improve!</p>
      <p>Best regards,</p>
      <p>The GDG CUJ Team</p>
    `,
  };

  // Mail to you (Feedback details)
  const adminMailOptions = {
    from: '"GDG CUJ" sachinkc4456@gmail.com', // Sender's email
    to: '"GDG CUJ" sachinkc4456@gmail.com', // Your email
    subject: 'New Feedback Received',
    html: `
      <h1>New Feedback Received</h1>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <blockquote>${message}</blockquote>
    `,
  };

  // Send both emails
  Promise.all([
    transporter.sendMail(userMailOptions),
    transporter.sendMail(adminMailOptions),
  ])
    .then(() => {
      res.status(200).send('Feedback processed and emails sent');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Failed to send emails');
    });
});

