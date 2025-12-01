import mongoose from "mongoose";

const trackerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true }, // Added phone field
    service: { type: String, required: true }, // Replaced subject with service
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Tracker", trackerSchema);
