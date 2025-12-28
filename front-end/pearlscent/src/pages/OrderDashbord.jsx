import React, { useEffect, useState } from "react";
import axios from "axios";

const OrdersDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/api/orders");
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="p-6">Loading orders...</div>;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Recent Orders</h2>
      <div className="w-full overflow-x-auto shadow-sm border border-gray-100 rounded-lg">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 border">Order ID</th>
              <th className="p-3 border">Customer</th>
              <th className="p-3 border">Items</th>
              <th className="p-3 border">Total</th>
              <th className="p-3 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="p-3 border text-xs text-gray-500 uppercase">
                  {order._id.slice(-6)}
                </td>
                <td className="p-3 border">
                  <p className="font-medium">{order.userEmail || "Guest"}</p>
                  <p className="text-xs text-gray-400">
                    {order.shippingAddress}
                  </p>
                </td>
                <td className="p-3 border">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="text-sm">
                      {item.name}{" "}
                      <span className="text-gray-400">x{item.quantity}</span>
                    </div>
                  ))}
                </td>
                <td className="p-3 border font-bold text-green-600">
                  ${order.totalAmount.toFixed(2)}
                </td>
                <td className="p-3 border">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-bold ${
                      order.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-green-100 text-green-700"
                    }`}
                  >
                    {order.status.toUpperCase()}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && (
          <p className="text-center py-6 text-gray-500">No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default OrdersDashboard;
