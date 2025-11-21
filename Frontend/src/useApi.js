// src/useApi.js
import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "https://online-fee-payment-and-reciept-system-tb57.onrender.com/api";

const api = axios.create({
  baseURL: BASE,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

// attach token header automatically (user or admin token)
api.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("admin_token");

    if (token) config.headers["x-auth-token"] = token;
    else if (adminToken) config.headers["x-auth-token"] = adminToken;
  } catch (e) {
    // do nothing
  }
  return config;
}, (error) => Promise.reject(error));

export default api;
