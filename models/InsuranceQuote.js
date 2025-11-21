import mongoose from "mongoose";

const insuranceQuoteSchema = new mongoose.Schema({
  name: { type: String, required: true },       // User's full name
  phoneNumber: { type: String, required: true }, // User's phone number
  brand: { type: String, required: true },      
  carValue: { type: Number, required: true },
  trackerSelected: { type: Boolean, default: false },
  results: [
    {
      companyId: { type: mongoose.Schema.Types.ObjectId, ref: "InsuranceCompany" },
      companyName: String,
      insuranceAmount: Number,
      trackerAmount: Number,
      total: Number
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("InsuranceQuote", insuranceQuoteSchema);
