import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import companyRoutes from "./routes/companyRoutes.js";
import insuranceRoutes from "./routes/insuranceRoutes.js";
import healthRoutes from "./routes/healthRoutes.js";
import travelRoutes from "./routes/travelRoutes.js";
import quoteRequestRoutes from "./routes/quoteRequestRoutes.js";
<<<<<<< HEAD
import contactRoutes from "./routes/contactRoutes.js";
=======
import healthtakafulRoutes from "./routes/healthtakafulRoute.js";
import firetakafulRoutes from "./routes/firetakafulRoutes.js"
>>>>>>> b490692d15d2571f96606801d815aca18e1a6dfe
dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


app.use("/api/companies", companyRoutes);
app.use("/api/insurance/", insuranceRoutes);
app.use("/api/health", healthRoutes);
app.use("/api/travel", travelRoutes);
app.use("/api/quote-requests", quoteRequestRoutes);
<<<<<<< HEAD
app.use("/api", contactRoutes);

=======
app.use("/api/healthtakaful", healthtakafulRoutes);
app.use("/api/firetakaful", firetakafulRoutes);
>>>>>>> b490692d15d2571f96606801d815aca18e1a6dfe
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
