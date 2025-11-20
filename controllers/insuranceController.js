import InsuranceCompany from "../models/InsuranceCompany.js";

export const calculateInsurance = async (req, res) => {
  try {
    const { carValue, tracker } = req.body;

    // 1. Fetch all companies
    const companies = await InsuranceCompany.find();

    // 2. Calculate for each company
    const results = companies.map(company => {
      const insuranceAmount = (carValue * company.baseRate) / 100;
      const trackerAmount = tracker ? 15000 : 0;
      const total = insuranceAmount + trackerAmount;

      return {
        companyId: company._id,
        name: company.name,
        logo: company.logo,
        workshops: company.workshops,
        insuranceAmount,
        trackerAmount,
        total
      };
    });

    res.json({
      success: true,
      carValue,
      trackerApplied: tracker,
      results
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
