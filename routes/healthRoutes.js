// routes/healthRoutes.js
import express from "express";
import { submitHealthForm } from "../controllers/healthController.js";

const router = express.Router();

router.post("/", submitHealthForm);

export default router;
