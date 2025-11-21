// src/useApi.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL 
  || "https://online-fee-payment-and-reciept-system-tb57.onrender.com/api";

const api = axios.create({
  baseURL: BASE,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const adminToken = localStorage.getItem("admin_token");

  if (token) config.headers["x-auth-token"] = token;
  if (adminToken) config.headers["x-auth-token"] = adminToken;

  return config;
});

export default api;
