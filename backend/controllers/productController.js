import Product from "../models/Product.js";

// @desc    Get all products (Public)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a product (Admins Only)
export const createProduct = async (req, res) => {
  try {
    // 1. Extract the role from Clerk's publicMetadata
   

    const { name, price, description, rating, discount } = req.body;
    
    // Multer handles the file upload
    const imagePath = req.file ? `/uploads/${req.file.filename}` : "";

    const newProduct = new Product({
      name,
      price,
      description,
      rating,
      discount,
      image: imagePath,
    });

    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

import fs from "fs";
import path from "path";


// @desc    Delete a product (Admins Only)
// @route   DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  try {
    // 1. Admin Security Check
    
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // 2. Delete the associated image file from the /uploads folder
    if (product.image) {
      const imagePath = path.join(process.cwd(), product.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // 3. Remove product from Database
    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product and associated image deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};