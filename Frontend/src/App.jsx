// src/App.jsx
import React, { createContext, useMemo, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";

/* Pages */
import LandingPage from "./Pages/LandingPage";
import LoginPage from "./Pages/LoginPage";
import SignUpPage from "./Pages/SignUpPage";
import HomePage from "./Pages/HomePage";
import ForgotPasswordPage from "./Pages/ForgotPasswordPage";
import ResetPasswordPage from "./Pages/ResetPasswordPage";
import AdminLoginPage from "./Pages/AdminLoginPage";
import AdminDashboard from "./Pages/AdminDashboard";
import PaymentPage from "./Pages/PaymentPage";
import ProtectedRoute from "./Components/ProtectedRoute";
import AboutPage from "./Pages/AboutPage";
import FeaturesPage from "./Pages/FeaturesPage";

/* Context */
export const ApiContext = createContext({
  apiBase: "",
  axiosInstance: axios,
});

/* Determine API base */
const resolveApiBase = () => {
  const envUrl = import.meta.env.VITE_API_URL;
  if (envUrl && envUrl.trim() !== "") return envUrl.replace(/\/$/, "");

  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  )
    return "http://localhost:5000";

  return "https://online-fee-payment-and-reciept-system-tb57.onrender.com";
};

/* Install fetch rewrite */
const installFetchRewrite = (apiBase) => {
  if (window.__API_REWRITE_INSTALLED__) return;
  window.__API_REWRITE_INSTALLED__ = true;

  const originalFetch = window.fetch.bind(window);

  window.fetch = async (input, init) => {
    let url = typeof input === "string" ? input : input?.url ?? "";

    const looksLikeApi =
      url.startsWith("/api") ||
      url.includes("localhost") ||
      url.includes("127.0.0.1");

    if (looksLikeApi) {
      if (url.startsWith("/")) url = apiBase + url;
      else {
        const p = new URL(url);
        if (p.hostname.includes("localhost")) {
          const base = new URL(apiBase);
          p.hostname = base.hostname;
          p.port = base.port;
          p.protocol = base.protocol;
          url = p.toString();
        }
      }
    }

    return originalFetch(url, init);
  };
};

/* MAIN APP */
const App = () => {
  const apiBase = useMemo(() => resolveApiBase(), []);

  // ✅ FIX: Create axiosInstance BEFORE rendering provider
  const axiosInstance = useMemo(() => {
    return axios.create({
      baseURL: `${apiBase}/api`, // MUST point to your backend routes
      timeout: 20000,
    });
  }, [apiBase]);

  useEffect(() => {
    installFetchRewrite(apiBase);
  }, [apiBase]);

  return (
    <ApiContext.Provider value={{ apiBase, axiosInstance }}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/features" element={<FeaturesPage />} />

        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <PaymentPage />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </ApiContext.Provider>
  );
};

export default App;
