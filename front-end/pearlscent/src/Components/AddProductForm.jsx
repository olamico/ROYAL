import React, { useState } from "react";
import { createProduct } from "../services/productService";

const AddProductForm = () => {
  const [file, setFile] = useState(null); // State for the actual file
  const [preview, setPreview] = useState(""); // State for the image preview
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    rating: 0,
    discount: 0,
    description: "",
  });

  // Handle image selection
  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile)); // Create a temp URL to show the image
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Use FormData to bundle text and files
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("rating", formData.rating);
    data.append("discount", formData.discount);
    data.append("image", file); // Must match upload.single("image") in backend

    try {
      await createProduct(data); // Pass FormData to your service
      alert("Product added successfully!");

      // Reset form
      setFormData({
        name: "",
        price: "",
        rating: 0,
        discount: 0,
        description: "",
      });
      setFile(null);
      setPreview("");
    } catch (err) {
      console.error("Error uploading product:", err);
      alert("Failed to upload product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white rounded shadow border border-gray-100"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-800">Add New Product</h2>

      <input
        type="text"
        placeholder="Product Name"
        value={formData.name}
        className="w-full border p-2 mb-2 rounded focus:outline-blue-500"
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />

      <input
        type="number"
        placeholder="Price"
        value={formData.price}
        className="w-full border p-2 mb-2 rounded focus:outline-blue-500"
        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
        required
      />

      <textarea
        placeholder="Description"
        value={formData.description}
        className="w-full border p-2 mb-2 rounded focus:outline-blue-500"
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      {/* Image Upload Field */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Product Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          required
        />
      </div>

      {/* Instant Preview */}
      {preview && (
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-1">Preview:</p>
          <img
            src={preview}
            alt="Selected"
            className="w-full h-40 object-cover rounded border"
          />
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold transition-colors"
      >
        Save Product
      </button>
    </form>
  );
};

export default AddProductForm;
