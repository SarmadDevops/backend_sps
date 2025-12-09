// models/HealthInsurance.js
import mongoose from "mongoose";

const healthInsuranceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  personType: { type: String, required: true }, // myself | staff | family | parents
  yourAge: { type: Number }, // for "myself"
  spouseAge: { type: Number }, // optional for family
  children: { type: String }, // comma-separated ages for family, e.g. "3,7"
  parentsAgeRange: { type: String }, // for parents, e.g. "upto60" or "60-70"
  companyName: { type: String }, // for staff
  numberOfPersons: { type: Number }, // for staff
  treatmentLimit: { type: Number, required: true }, // numeric PKR value
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("HealthInsurance", healthInsuranceSchema);
