import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage"; // 1. Import your new CartPage
import { useCart } from "./context/CartContext"; // 2. Import the cart hook

function App() {
  const { cart } = useCart(); // 3. Access the cart state

  // Calculate total number of items in cart
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Navigation Bar */}
        <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
          <h1 className="text-xl font-bold text-blue-600">StoreFront</h1>
          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-600 font-medium"
            >
              Home
            </Link>

            {/* 4. The New Cart Link with Badge */}
            <Link
              to="/cart"
              className="relative text-gray-700 hover:text-blue-600 font-medium flex items-center"
            >
              <span>Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-red-500 text-white text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full border-2 border-white">
                  {totalItems}
                </span>
              )}
            </Link>

            <Link
              to="/admin"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Admin Panel
            </Link>
          </div>
        </nav>

        {/* Page Content */}
        <div className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            {/* 5. Add the Cart Route */}
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
