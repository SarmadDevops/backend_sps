// models/HealthInsurance.js
import mongoose from "mongoose";

const healthInsuranceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  personType: { type: String, required: true }, 
  yourAge: { type: Number, required: true },
  spouseAge: { type: Number },
  children: { type: String }, 
  treatmentLimit: { type: String, required: true }, 
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("HealthInsurance", healthInsuranceSchema);
