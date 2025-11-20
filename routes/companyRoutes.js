import express from "express";
import { addCompany, getCompanies, upload } from "../controllers/companyController.js";

const router = express.Router();

// Add new insurance company
// router.post("/add", addCompany);
router.post("/add", upload.single("logo"), addCompany);

// Get all companies
router.get("/all", getCompanies);

export default router;
