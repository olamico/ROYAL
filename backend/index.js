import path from "path";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./db/connectDB.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
dotenv.config();          // ✅ load env first
connectDB();              // ✅ connect DB BEFORE server starts

const app = express();

app.use(cors({
  origin: ["http://localhost:5173"],
  credentials: true
}));
app.use(express.json());



app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
