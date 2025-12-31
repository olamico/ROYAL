import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/products";

// 1. GET Products (Public - No token needed)
export const getProducts = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

// 2. CREATE Product (Admin Only - Needs Token)
export const createProduct = async (productData, token) => {
  const response = await axios.post(API_BASE_URL, productData, {
    headers: {
      "Content-Type": "multipart/form-data", // Required for Multer/Images
      Authorization: `Bearer ${token}`, // Clerk Security Token
    },
  });
  return response.data;
};

// 3. DELETE Product (Admin Only - Needs Token)
export const deleteProduct = async (productId, token) => {
  const response = await axios.delete(`${API_BASE_URL}/${productId}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Clerk Security Token
    },
  });
  return response.data;
};
