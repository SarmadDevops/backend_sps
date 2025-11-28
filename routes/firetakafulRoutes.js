// routes/healthRoutes.js
import express from "express";
import { submitFireTakafulForm } from "../controllers/firetakafulController.js";

const router = express.Router();
router.post("/", submitFireTakafulForm);
export default router;
