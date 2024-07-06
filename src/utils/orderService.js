import axios from "axios";

const API_URL = "https://elctroshoptn.netlify.app/api/orders";

export const createOrder = async (orderData) => {
  const response = await axios.post(API_URL, orderData);
  return response.data;
};
export const getOrder = async (orderId) => {
  const response = await axios.get(`${API_URL}/${orderId}`);
  return response.data;
};
export const getOrders = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
