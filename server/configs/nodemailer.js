import nodemailer from 'nodemailer'
// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.SMPT_USER,
        pass: process.env.SMTP_PASS,
    },
});

export default transporter;