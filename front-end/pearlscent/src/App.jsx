import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AdminPage from "./pages/AdminPage";
import CartPage from "./pages/CartPage";
import Navbar from "./Components/Navbar"; // Import the new component

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Render the separate Navbar component */}
        <Navbar />

        <div className="container mx-auto py-6">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/cart" element={<CartPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
