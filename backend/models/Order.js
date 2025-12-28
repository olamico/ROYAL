import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        name: String,
        quantity: Number,
        price: Number,
      },
    ],
    totalAmount: { type: Number, required: true },
    shippingAddress: { type: String, default: "Address not provided" },
    status: { type: String, default: "Pending" },
  },
  { timestamps: true } // This automatically adds 'createdAt' and 'updatedAt'
);

const Order = mongoose.model("Order", orderSchema);
export default Order;