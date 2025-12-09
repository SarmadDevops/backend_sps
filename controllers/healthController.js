// controllers/healthController.js
import HealthInsurance from "../models/HealthInsurance.js";
import { sendEmail } from "../utils/email.js";

const treatmentLimitMap = {
  "1k-80k": 80000,
  "80k-1Lac": 100000,
  "2Lac-4Lac": 400000,
  "5Lac-above": 500000,
};

export const submitHealthForm = async (req, res) => {
  try {
    const {
      name,
      phone,
      personType,
      yourAge,
      spouseAge,
      children,
      treatmentLimit,
      parentsAgeRange,
      companyName,
      numberOfPersons,
    } = req.body;

    // Basic required fields for all types
    if (!name || !phone || !personType || !treatmentLimit) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    // Convert string key to numeric limit
    const numericLimit = treatmentLimitMap[treatmentLimit];
    if (!numericLimit) {
      return res.status(400).json({ success: false, message: "Invalid treatment limit" });
    }

    // Additional validation depending on personType
    const payload = {
      name,
      phone,
      personType,
      treatmentLimit: numericLimit,
      createdAt: new Date(),
    };

    if (personType === "myself") {
      if (!yourAge) return res.status(400).json({ success: false, message: "Your age is required for 'myself'." });
      payload.yourAge = Number(yourAge);
    } else if (personType === "family") {
      if (!spouseAge && (!children || !children.length)) {
        // require at least spouse or children
        return res.status(400).json({ success: false, message: "Spouse age or children required for family." });
      }
      if (spouseAge) payload.spouseAge = Number(spouseAge);
      if (children) payload.children = children; // keep string like "3,7"
    } else if (personType === "parents") {
      // parentsAgeRange should be something like "upto60" or "60-70" or "70-above" (frontend provides readable values)
      if (!parentsAgeRange) return res.status(400).json({ success: false, message: "Parents age range is required for parents." });
      payload.parentsAgeRange = parentsAgeRange;
    } else if (personType === "staff") {
      if (!companyName || !numberOfPersons) {
        return res.status(400).json({ success: false, message: "Company name and number of persons required for staff." });
      }
      payload.companyName = companyName;
      payload.numberOfPersons = Number(numberOfPersons);
    }

    // Save in MongoDB
    const savedForm = await HealthInsurance.create(payload);

    // Build email body dynamically
    let emailBody = `<h2>New Health Insurance Request</h2>
      <p><strong>Type:</strong> ${personType}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Treatment Limit:</strong> PKR ${numericLimit}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>`;

    if (payload.yourAge !== undefined) emailBody += `<p><strong>Your Age:</strong> ${payload.yourAge}</p>`;
    if (payload.spouseAge !== undefined) emailBody += `<p><strong>Spouse Age:</strong> ${payload.spouseAge}</p>`;
    if (payload.children) emailBody += `<p><strong>Children Ages:</strong> ${payload.children}</p>`;
    if (payload.parentsAgeRange) emailBody += `<p><strong>Parents Age Range:</strong> ${payload.parentsAgeRange}</p>`;
    if (payload.companyName) emailBody += `<p><strong>Company Name:</strong> ${payload.companyName}</p>`;
    if (payload.numberOfPersons !== undefined) emailBody += `<p><strong>Number of Persons:</strong> ${payload.numberOfPersons}</p>`;

    await sendEmail("New Health Insurance Submission", emailBody);

    res.status(200).json({
      success: true,
      message: "Form submitted successfully & email sent",
      savedForm,
    });

  } catch (error) {
    console.error("submitHealthForm error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
