import TravelInsurance from "../models/TravelInsurance.js";
import { sendEmail } from "../utils/email.js";

export const submitTravelForm = async (req, res) => {
  try {
    const {
      name,
      phone,
      travelType,
      countryToTravel,
      destination,
    } = req.body;

    const savedForm = await TravelInsurance.create({
      name,
      phone,
      travelType,
      countryToTravel,
      destination,
    });

    const emailBody = `
      <h2>New Travel Takaful Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Travel Type:</strong> ${travelType}</p>
      <p><strong>Country To Travel:</strong> ${countryToTravel}</p>
      <p><strong>Destination:</strong> ${destination}</p>
      <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
    `;

    await sendEmail("New Travel Insurance Submission", emailBody);

    res.status(200).json({
      success: true,
      message: "Form submitted successfully & email sent",
      savedForm,
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
