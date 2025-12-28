import React from "react";
import AddProductForm from "../components/AddProductForm";
import OrdersDashboard from "./OrderDashbord";

const AdminPage = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Management Dashboard
      </h1>
      <div className="grid grid-cols-1 gap-8">
        <section>
          <AddProductForm />
          <hr />
          <OrdersDashboard />
        </section>
        {/* You could add a "Manage Products" table here later */}
      </div>
    </div>
  );
};

export default AdminPage;
