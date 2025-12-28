import React from "react";
import { useCart } from "../context/CartContext";
import axios from "axios";

const CartPage = () => {
  const { cart, totalAmount, removeFromCart, clearCart, addToCart } = useCart();

  const handleCheckout = async () => {
    if (cart.length === 0) return alert("Your cart is empty!");

    const orderData = {
      items: cart.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: totalAmount,
      shippingAddress: "Customer Address", // You can add an input field for this later
    };

    try {
      // Make sure your backend order route is set up at /api/orders
      await axios.post("http://localhost:5000/api/orders", orderData);
      alert("Order placed successfully!");
      clearCart();
    } catch (err) {
      console.error("Checkout Error:", err);
      alert("Something went wrong with your order.");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>

      {cart.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500 mb-4">Your cart is empty.</p>
          <button className="bg-blue-600 text-white px-6 py-2 rounded">
            Shop Now
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Item List */}
          <div className="lg:w-2/3">
            {cart.map((item) => (
              <div
                key={item._id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`http://localhost:5000${item.image}`}
                    className="w-16 h-16 object-cover rounded"
                    alt=""
                  />
                  <div>
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ${item.price} x {item.quantity}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3 bg-gray-50 p-6 rounded-lg shadow-sm h-fit">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
            <hr className="mb-4" />
            <div className="flex justify-between text-xl font-bold mb-6">
              <span>Total</span>
              <span>${totalAmount.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition"
            >
              Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
