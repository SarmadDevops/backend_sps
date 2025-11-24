import mongoose from "mongoose";

const travelInsuranceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },

  travelType: { type: String, required: true },
  countryToTravel: { type: String, required: true },
  destination: { type: String, required: true },

  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("TravelInsurance", travelInsuranceSchema);
