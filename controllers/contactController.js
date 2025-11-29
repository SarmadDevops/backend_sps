// controllers/contactController.js
import Contact from "../models/Contact.js";
import { sendEmail } from "../utils/email.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save in DB
    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    // Email HTML string
    const htmlContent = `
      <h3>New Contact Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Subject:</b> ${subject}</p>
      <p><b>Message:</b> ${message}</p>
    `;

    // Send email
    await sendEmail(`New Contact Message: ${subject}`, htmlContent);

    res.status(200).json({
      message: "Message sent successfully",
      data: newContact,
    });

  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
