import mongoose from "mongoose";

const vehicleInfoSchema = new mongoose.Schema({
  brand: { type: String },
  model: { type: String },
  currentValue: { type: String },
  trackerRequired: { type: Boolean, default: false },
});

const selectedQuoteSchema = new mongoose.Schema({
  company: { type: String },
  logo: { type: String },
  rate: { type: String },
  insurancePlan: { type: String },
  installmentAmount: { type: String },
  total: { type: String },
});

const insuranceQuoteRequestSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true },
  vehicleInfo: { type: vehicleInfoSchema },
  selectedQuote: { type: selectedQuoteSchema },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("InsuranceQuoteRequest", insuranceQuoteRequestSchema);
