// companyController.js
import multer from "multer";
import path from "path";
import InsuranceCompany from "../models/InsuranceCompany.js";
import fs from "fs";

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // folder to save images
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

export const upload = multer({ storage });

// ADD COMPANY WITH IMAGE
export const addCompany = async (req, res) => {
  try {
    let { name, baseRate, workshops, trackerAvailable, trackerPrice } = req.body;
const logo = req.file ? `/uploads/${req.file.filename}` : "";
 if (typeof workshops === "string") {
      workshops = JSON.parse(workshops);
    }
    const company = await InsuranceCompany.create({
      name,
      logo,
      baseRate,
      workshops,
      trackerAvailable,
      trackerPrice
    });

    res.json({
      success: true,
      message: "Company added successfully",
      company
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


// GET ALL COMPANIES
export const getCompanies = async (req, res) => {
  try {
    const companies = await InsuranceCompany.find();

    res.status(200).json({
      success: true,
      companies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
