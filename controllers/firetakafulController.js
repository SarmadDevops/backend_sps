// controllers/firetakafulController.js
import FireTakaful from "../models/FireTakaful.js";
import { sendEmail } from "../utils/email.js";

export const submitFireTakafulForm = async (req, res) => {
  try {
    const { name, companyname, workmail, city, noofemployees, surety } = req.body;

    // Save form data to FireTakaful collection
    const savedForm = await FireTakaful.create({
      name,
      companyname,
      workmail,
      city,
      noofemployees,
      surety,
    });

    // Prepare email content
    const emailBody = `
      <h2>New Fire Takaful Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Company:</strong> ${companyname}</p>
      <p><strong>Email:</strong> ${workmail}</p>
      <p><strong>City:</strong> ${city}</p>
      <p><strong>No. of Employees:</strong> ${noofemployees}</p>
      <p><strong>Surety:</strong> ${surety}</p>
    `;

    // Send email
    await sendEmail("New Fire Insurance Submission", emailBody);

    res.status(200).json({
      success: true,
      message: "Form submitted successfully & email sent",
      savedForm,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
