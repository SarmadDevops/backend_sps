import express from "express";
import { submitTravelForm } from "../controllers/travelController.js";

const router = express.Router();

router.post("/submit", submitTravelForm);

export default router;
