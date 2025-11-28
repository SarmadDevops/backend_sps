// routes/healthRoutes.js
import express from "express";
import { submitHealthTakafulForm } from "../controllers/healthTakafulController.js"; // <-- correct name

const router = express.Router();
router.post("/", submitHealthTakafulForm);
export default router;
