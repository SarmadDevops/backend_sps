import express from "express";
import { submitQuoteRequest } from "../controllers/quotesRequestController.js";

const router = express.Router();

router.post("/", submitQuoteRequest);

export default router;
