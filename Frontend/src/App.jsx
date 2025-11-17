// src/App.js
import { Routes, Route } from 'react-router-dom';
import { createContext } from 'react';

// Pages
import LandingPage from './Pages/LandingPage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import HomePage from './Pages/HomePage';
import ForgotPasswordPage from './Pages/ForgotPasswordPage';
import ResetPasswordPage from './Pages/ResetPasswordPage';
import AdminLoginPage from './Pages/AdminLoginPage';
import AdminDashboard from './Pages/AdminDashboard';
import PaymentPage from './Pages/PaymentPage';
import AboutPage from './Pages/AboutPage';
import FeaturesPage from './Pages/FeaturesPage';

// Components
import ProtectedRoute from './Components/ProtectedRoute';

// API Base URL
import { API_BASE_URL } from './apiConfig';

// Create context
export const ApiContext = createContext();

const App = () => {
  return (
    <ApiContext.Provider value={{ api: API_BASE_URL }}>
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
