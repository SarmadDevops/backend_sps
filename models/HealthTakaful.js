// models/HealthTakaful.js
import mongoose from "mongoose";

const healthTakafulSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyname:{type:String,required:true},
  workmail:{type:String,required:true},
  phone: { type: String, required: true },
  city:{type: String, required: true},
  noofemployees:{type:Number,required:true},
  surety:{type:String,required:true}
});

export default mongoose.model("HealthTakaful", healthTakafulSchema);
