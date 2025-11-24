import InsuranceCompany from "../models/InsuranceCompany.js";
import InsuranceQuote from "../models/InsuranceQuote.js";

export const calculateInsurance = async (req, res) => {
  try {
    const { name, phoneNumber, brand, value, tracker } = req.body;

    // 1. Fetch all companies
    const companies = await InsuranceCompany.find();

    // 2. Calculate for each company
    const results = companies.map(company => {
      const insuranceAmount = (value * company.baseRate) / 100;
      const trackerAmount = tracker ? 15000 : 0;
      const total = insuranceAmount + trackerAmount;

      return {
        companyId: company._id,
        companyName: company.name,
        companyLogo: company.logo, 
        companyWorkshops: company.workshops,  
        insuranceAmount: Math.round(insuranceAmount),
        trackerAmount: Math.round(trackerAmount),
        total: Math.round(total)
      };
    });

    // 3. Save in database
    const newQuote = await InsuranceQuote.create({
      name,
      phoneNumber,
      brand,
      carValue: value,
      trackerSelected: tracker,
      results
    });

    res.json({
      success: true,
      name,
      phoneNumber,
      brand,
      value,
      trackerApplied: tracker,
      results,
      savedQuoteId: newQuote._id
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
