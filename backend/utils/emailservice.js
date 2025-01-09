const nodemailer = require('nodemailer');

// Create a transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.example.com', // Replace with your SMTP host (e.g., smtp.gmail.com for Gmail)
  port: 587,               // Use 587 for TLS or 465 for SSL
  secure: false,           // Set to true for port 465
  auth: {
    user: 'your-email@example.com',  // Replace with your email
    pass: 'your-email-password',     // Replace with your email password or app password
  },
});

// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const mailOptions = {
      from: '"Your App Name" <your-email@example.com>', // Sender's address
      to,          // Recipient's email address
      subject,     // Subject line
      text,        // Plain text body
      html,        // HTML body
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
    return info;
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw new Error('Email sending failed');
  }
};

module.exports = sendEmail;
