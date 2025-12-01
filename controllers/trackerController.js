import Tracker from "../models/Tracker.js";
import { sendEmail } from "../utils/email.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, phone, service, message } = req.body;

    if (!name || !email || !phone || !service || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save in DB
    const newContact = await Tracker.create({
      name,
      email,
      phone,
      service,
      message,
    });

    // Email HTML string
    const htmlContent = `
      <h3>New Contact Message</h3>
      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>
      <p><b>Service:</b> ${service}</p>
      <p><b>Message:</b> ${message}</p>
    `;

    // Send email
    await sendEmail(`New Tracker Contact Message: ${service}`, htmlContent);

    res.status(200).json({
      message: "Message sent successfully",
      data: newContact,
    });
  } catch (error) {
    console.error("Email error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
