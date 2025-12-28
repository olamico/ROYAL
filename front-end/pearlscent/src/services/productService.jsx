import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/products"; // Adjust to your server port

export const getProducts = async () => {
  const response = await axios.get(API_BASE_URL);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_BASE_URL, productData);
  return response.data;
};
