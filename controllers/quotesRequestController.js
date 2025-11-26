import InsuranceQuoteRequest from "../models/InsuranceQuoteRequest.js";
import { sendEmail } from "../utils/email.js";

export const submitQuoteRequest = async (req, res) => {
  try {
    const { fullName, phoneNumber, email, vehicleInfo, selectedQuote } = req.body;

    if (!fullName || !phoneNumber || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Save to MongoDB
    const newRequest = new InsuranceQuoteRequest({
      fullName,
      phoneNumber,
      email,
      vehicleInfo,
      selectedQuote,
    });
    await newRequest.save();

    // Build HTML email
    const htmlMessage = `
      <h2>New Insurance Quote Request</h2>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phoneNumber}</p>
      <p><strong>Email:</strong> ${email}</p>

      ${vehicleInfo ? `
        <h3>Vehicle Information:</h3>
        <p><strong>Brand:</strong> ${vehicleInfo.brand}</p>
        <p><strong>Model:</strong> ${vehicleInfo.model}</p>
        <p><strong>Current Value:</strong> RS ${vehicleInfo.currentValue}</p>
        <p><strong>Tracker Required:</strong> ${vehicleInfo.trackerRequired ? "Yes (+RS 15,000)" : "No"}</p>
      ` : ""}

      ${selectedQuote ? `
        <h3>Selected Plan:</h3>
        <p><strong>Company:</strong> ${selectedQuote.company}</p>
        <p><strong>Rate:</strong> ${selectedQuote.rate}</p>
        <p><strong>Plan:</strong> ${selectedQuote.insurancePlan}</p>
        <p><strong>Total:</strong> ${selectedQuote.total}</p>
        ${selectedQuote.installmentAmount ? `<p><strong>Installment:</strong> ${selectedQuote.installmentAmount}</p>` : ""}
      ` : ""}
    `;

    await sendEmail("New Insurance Quote Request", htmlMessage);

    return res.status(200).json({ message: "Quote request submitted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Failed to submit request" });
  }
};
