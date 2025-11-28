// models/HealthTakaful.js
import mongoose from "mongoose";

const FireTakafulSchema = new mongoose.Schema({
  name: { type: String, required: true },
  companyname:{type:String,required:true},
  workmail:{type:String,required:true},
  city:{type: String, required: true},
  noofemployees:{type:String,required:true},
  surety:{type:String,required:true}
});

export default mongoose.model("FireTakaful", FireTakafulSchema);
