// utils/email.js
import nodemailer from "nodemailer";

export const sendEmail = async (subject, htmlMessage) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,     // sender email
      pass: process.env.ADMIN_PASSWORD,  // app password
    },
  });

  // If htmlMessage is string → old usage (insurance mails)
  let html = "";
  let to = process.env.ADMIN_EMAIL; // default
  let fromName = "Insurance App";

  if (typeof htmlMessage === "string") {
    html = htmlMessage;
  } else if (typeof htmlMessage === "object") {
    html = htmlMessage.html || "";
    to = htmlMessage.to || process.env.ADMIN_EMAIL;
    fromName = htmlMessage.fromName || "Insurance App";
  }

  await transporter.sendMail({
    from: `"${fromName}" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject,
    html,
  });
};
