import axios from "axios";

const api = axios.create({
  baseURL: "https://online-fee-payment-and-reciept-system-tb57.onrender.com/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("admin_token");

  if (token) config.headers["x-auth-token"] = token;
  if (adminToken) config.headers["x-auth-token"] = adminToken;

  return config;
});

export default api;
