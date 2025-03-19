import nodemailer from 'nodemailer';

// Create a transporter object using SMTP settings
const transporter = nodemailer.createTransport({
  service: 'gmail', 
  port: 587, 
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP
  }
});

// Function to send an email
export const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: to,
    subject: subject,
    text: text
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};