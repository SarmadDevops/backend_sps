// utils/email.js
import nodemailer from "nodemailer";

export const sendEmail = async (subject, htmlMessage) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,     
      pass: process.env.ADMIN_PASSWORD, 
    },
  });

  await transporter.sendMail({
    from: `"Insurance App" <${process.env.ADMIN_EMAIL}>`,
    to: process.env.SPS_EMAIL, 
    subject,
    html: htmlMessage,
  });
};