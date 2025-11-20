import mongoose from "mongoose";

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  baseRate: { type: Number, default: 1.5 }, // insurance %
  workshops: [String],
  trackerAvailable: { type: Boolean, default: true },
  trackerPrice: { type: Number, default: 15000 } // FIXED TRACKER VALUE
});

export default mongoose.model("InsuranceCompany", companySchema);
