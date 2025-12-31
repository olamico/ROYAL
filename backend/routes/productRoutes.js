import express from "express";
import multer from "multer";
import path from "path";
import { getProducts, createProduct, deleteProduct} from "../controllers/productController.js";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";

const router = express.Router();

// --- Multer Configuration ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// --- Routes ---

// GET products (public)
router.get("/", getProducts);

// POST product (admin) - uses 'upload' middleware before the controller
router.post("/", upload.single("image"), createProduct);

router.delete("/:id",  deleteProduct);

export default router;