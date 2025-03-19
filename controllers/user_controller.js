import { User } from "../models/user_model.js";
import { userValidator } from "../validators/validator.js";
import bcrypt from "bcrypt";
import nodemailer from 'nodemailer';

// Create the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP 
    }
});

// Function to send an email
const sendEmail = async (to, subject, text, html) => {
    const mailOptions = {
        from: `"Note Taking App" <manacquah81@gmail.com>`, // Sender address
        to, // List of recipients
        subject, // Subject line
        text, // Plain text body
        html // HTML body
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('Error sending email: ' + error);
    }
};

export const registerUser = async (req, res) => {
    const { error, value } = userValidator.validate(req.body);
    if (error) {
        return res.status(422).json({ message: error.details[0].message });
    }

    const existingUser = await User.findOne({ email: value.email });
    if (existingUser) {
        return res.status(409).json({ message: "User already registered" });
    } else {
        const hashedPassword = await bcrypt.hash(value.password, 12);

        const newUser = await User.create({
            userName: value.userName,
            email: value.email,
            password: hashedPassword,
        });

        // Call sendEmail for the welcome message
        await sendEmail(
            newUser.email,
            "Welcome to Note app , your favorite note app, have fun!",
            `Hello ${newUser.userName}, start writing!`,
            `<h1>Welcome!</h1><p>Dear ${newUser.userName},</p><p>Thank you for registering with us. We are excited to have you!</p><p>If you have any questions, feel free to reach out to our support team.</p><p>Best regards</p>`
        );

        return res.status(201).json({
            message: "User created successfully",
            data: newUser,
        });
    }
};