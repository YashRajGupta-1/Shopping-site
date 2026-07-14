import nodemailer from "nodemailer";
import {config} from "dotenv";
config();

export async function sendEmail(to, subject, text) {
    const transporter = nodemailer.createTransport({
     host: 'smtp.gmail.com',
     port: 587,
     secure: false,
      auth: {
        user: process.env.MY_EMAIL, // your email
        pass:  process.env.MY_PASSWORD// your email password
      }
    });
  
    const mailOptions = {
      from: process.env.MY_EMAIL, // your email
      to: to,
      subject: subject,
      html: text
    };
     
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email sent");
    } catch (err) {
        console.error("Email sending failed:", err);
    }
    
  }