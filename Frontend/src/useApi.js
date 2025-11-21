// src/useApi.js
import axios from "axios";

const BASE =
  import.meta.env.VITE_API_URL ||
  "https://online-fee-payment-and-reciept-system-tb57.onrender.com/api";

console.log("API BASE URL:", BASE);

const api = axios.create({
  baseURL: BASE,        // <-- ensures /api prefix is ALWAYS included
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("admin_token");

    if (token) config.headers["x-auth-token"] = token;
    if (adminToken) config.headers["x-auth-token"] = adminToken;

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
