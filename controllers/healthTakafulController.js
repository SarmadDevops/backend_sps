import HealthTakaful from "../models/HealthTakaful.js";
import { sendEmail } from "../utils/email.js";

export const submitHealthTakafulForm = async (req, res) => {
  try {
    const { name, companyname, workmail, phone, city, noofemployees, surety } =
      req.body;

    const savedForm = await HealthTakaful.create({
      name,
      companyname,
      workmail, // matches schema
      phone,
      city,
      noofemployees,
      surety,
    });

    const emailBody = `
      <h2>New Health Takaful Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${companyname}</p>
      <p><strong>Email:</strong> ${workmail}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>No. of Employees:</strong> ${noofemployees}</p>
      <p><strong>Surety:</strong> ${surety}</p>
    `;

    await sendEmail("New Health Insurance Submission", emailBody);

    res.status(200).json({
      success: true,
      message: "Form submitted successfully & email sent",
      savedForm,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
