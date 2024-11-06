const nodemailer = require('nodemailer');
require('dotenv').config();

// config email
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,        
  port: process.env.EMAIL_PORT,        
  secure: false,                       // Sử dụng TLS
  auth: {
    user: process.env.EMAIL_USER,      
    pass: process.env.EMAIL_PASS       
  }
});

// Sent mail
const sendEmail = async (to, subject, text) => {
  try {
    const mailOptions = {
      from: "Road Watcher",    
      to: to,                          
      subject: subject,                
      text: text,                      
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return info;
  } catch (error) {
    console.error('Error sending email: ', error);
    throw error;
  }
};

module.exports = sendEmail;
