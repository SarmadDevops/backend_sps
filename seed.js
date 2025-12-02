import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import InsuranceCompany from "./models/InsuranceCompany.js";

dotenv.config(); // load .env

// Read JSON file manually
const companies = JSON.parse(fs.readFileSync("./companies.json", "utf-8"));

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // clear previous records
    await InsuranceCompany.deleteMany({});
    console.log("Old data removed");

    // insert new companies
    await InsuranceCompany.insertMany(companies);
    console.log("Seed data inserted successfully!");

    process.exit();
  } catch (error) {
    console.error("Error:", error);
    process.exit(1);
  }
};

seedData();
