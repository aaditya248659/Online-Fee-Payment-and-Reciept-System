import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from "../useApi";
import '../PageCss/ResetPasswordPage.css';
import axios from "axios";

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({
    newPassword: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPasswords(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (passwords.newPassword !== passwords.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (passwords.newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      await api.post(`/users/reset-password/${token}`, { newPassword })
      setSuccess('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);

    } catch (err) {
      if (err.response && err.response.status === 400) {
        setError('Invalid or expired reset token');
      } else {
        setError('Error resetting password. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Navbar only */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-shield-check"></i>
            FeePay
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto d-flex flex-row gap-3">
              <Link className="nav-link" to="/">
                <i className="bi bi-house me-1"></i>
                Home
              </Link>
              <Link className="nav-link" to="/features">
                <i className="bi bi-star me-1"></i>
                Features
              </Link>
              <Link className="nav-link" to="/about">
                <i className="bi bi-info-circle me-1"></i>
                About
              </Link>
              <Link className="nav-link" to="/signup">
                <i className="bi bi-person-plus me-1"></i>
                Student Registration
              </Link>
              <Link className="nav-link admin-nav" to="/admin-login">
                <i className="bi bi-shield-lock me-1"></i>
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Reset Password container */}
      <div className="signup-bg d-flex align-items-center justify-content-center min-vh-100">
        <div className="signup-box glass-effect shadow-lg p-4">
          <h3 className="mb-4 text-center fw-bold">Reset Password</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="newPassword" className="form-label">New Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  className="form-control"
                  value={passwords.newPassword}
                  onChange={handleChange}
                  placeholder="Enter new password"
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword((prev) => !prev)}
                  role="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  value={passwords.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm new password"
                  required
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  role="button"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-gradient w-100 mb-2" disabled={loading}>
              <i className="bi bi-key me-2"></i>
              {loading ? 'Resetting...' : 'Reset Password'}
            </button>
            {error && <div className="text-danger text-center mt-2">{error}</div>}
            {success && <div className="text-success text-center mt-2">{success}</div>}
            <div className="text-center mt-3">
              <Link to="/login" className="signup-link">Back to Login</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Footer only */}
      <footer className="footer">
        <div className="container">
          <small>&copy; 2025 FeePay. All rights reserved.</small>
        </div>
      </footer>
    </>
  );
}

export default ResetPasswordPage;