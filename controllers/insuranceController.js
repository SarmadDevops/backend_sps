import InsuranceCompany from "../models/InsuranceCompany.js";
import InsuranceQuote from "../models/InsuranceQuote.js";
import { sendEmail } from "../utils/email.js";

export const calculateInsurance = async (req, res) => {
  try {
    const { name, phoneNumber, brand, value, tracker } = req.body;

    // 1. Fetch all companies
    const companies = await InsuranceCompany.find();

    // 2. Calculate for each company (still saving in DB)
    const results = companies.map(company => {
      const insuranceAmount = (value * company.baseRate) / 100;
      const trackerAmount = tracker ? 15000 : 0;
      const total = insuranceAmount + trackerAmount;

      return {
        companyId: company._id,
        companyName: company.name,
        companyLogo: company.logo, 
        insuranceAmount: Math.round(insuranceAmount),
        trackerAmount: Math.round(trackerAmount),
        total: Math.round(total)
      };
    });

    // 3. Save quote in DB
    const newQuote = await InsuranceQuote.create({
      name,
      phoneNumber,
      brand,
      carValue: value,
      trackerSelected: tracker,
      results
    });

    // ----------------------------------------------
    // 4. Send Email (only request details)
    // ----------------------------------------------
    const htmlBody = `
      <h2>New Insurance Quote Request</h2>
      <p><b>Name:</b> ${name}</p>
      <p><b>Phone:</b> ${phoneNumber}</p>
      <p><b>Car Brand:</b> ${brand}</p>
      <p><b>Car Value:</b> PKR ${value}</p>
      <p><b>Tracker Selected:</b> ${tracker ? "Yes" : "No"}</p>
      <p><b>Quote ID:</b> ${newQuote._id}</p>
    `;

    // Call email util
    await sendEmail("New Insurance Quote Received", htmlBody);

    res.json({
      success: true,
      message: "Quote calculated & email sent successfully",
      savedQuoteId: newQuote._id,
      results
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
