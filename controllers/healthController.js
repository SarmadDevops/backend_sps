// controllers/healthController.js
import HealthInsurance from "../models/HealthInsurance.js";
import { sendEmail } from "../utils/email.js";

// controllers/healthController.js
const treatmentLimitMap = {
  "1k-80k": 80000,
  "80k-1Lac": 100000,
  "2Lac-4Lac": 400000,
  "5Lac-above": 500000,
};

export const submitHealthForm = async (req, res) => {
  try {
    const {
      personType,
      yourAge,
      spouseAge,
      children,
      treatmentLimit
    } = req.body;

    // Convert string to number
    const numericLimit = treatmentLimitMap[treatmentLimit];
    if (!numericLimit) {
      return res.status(400).json({ success: false, message: "Invalid treatment limit" });
    }

    // Save in MongoDB
    const savedForm = await HealthInsurance.create({
      personType,
      yourAge,
      spouseAge,
      children,
      treatmentLimit: numericLimit,
    });

    const emailBody = `
      <h2>New Health Insurance Request</h2>
      <p><strong>Person Type:</strong> ${personType}</p>
      <p><strong>Your Age:</strong> ${yourAge}</p>
      <p><strong>Spouse Age:</strong> ${spouseAge || "N/A"}</p>
      <p><strong>Children:</strong> ${children || "N/A"}</p>
      <p><strong>Treatment Limit:</strong> PKR ${numericLimit}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
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


    