import Order from "../models/Order.js";

// @desc    Create a new order
// @route   POST /api/orders
export const createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress, userEmail } = req.body;

    // Optional: Add logic here to calculate total price on the server 
    // to prevent price manipulation from the frontend.

    const newOrder = new Order({
      items,
      totalAmount,
      shippingAddress,
      userEmail,
      status: "pending", // Default status
    });

    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Get all orders (for Admin Dashboard)
// @route   GET /api/orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};