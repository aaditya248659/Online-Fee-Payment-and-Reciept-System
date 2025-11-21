import React, { useState } from 'react';
import '../PageCss/SignupPage.css';
import { Link, useNavigate } from 'react-router-dom';
import api from "../useApi";

function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile_no, setMobileNo] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const validatePassword = (password) => {
    if (password.length < 8 || password.length > 16) {
      return 'Password must be 8-16 characters long';
    }
    if (!/[A-Z]/.test(password)) {
      return 'Password must contain at least one uppercase letter';
    }
    if (!/[a-z]/.test(password)) {
      return 'Password must contain at least one lowercase letter';
    }
    if (!/[0-9]/.test(password)) {
      return 'Password must contain at least one number';
    }
    if (!/[!@#$%^&*]/.test(password)) {
      return 'Password must contain at least one special character (!@#$%^&*)';
    }
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    }

    try {
      const data = { name, email, password, mobile_no };
      const response = await api.post("/users/register", data);

      console.log("response", response);
      alert("Registered Successfully!");
      navigate("/login");

    } catch (err) {
      console.error("Error during registration:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-bg">
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-shield-check"></i>
            FeePay
          </Link>
        </div>
      </nav>

      <div className="signup-container">
        <div className="signup-box glass-effect">
          <div className="signup-avatar">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Avatar" />
          </div>
          <h3 className="text-center mb-4">Student Registration</h3>

          <form onSubmit={handleSubmit}>

            <div className="form-group mb-3">
              <label className="form-label">Full Name</label>
              <input type="text" className="form-control"
                value={name} onChange={e => setName(e.target.value)}
                placeholder="Enter your full name" required />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Email Address</label>
              <input type="email" className="form-control"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email" required />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Mobile Number</label>
              <input type="text" className="form-control"
                value={mobile_no} onChange={e => setMobileNo(e.target.value)}
                placeholder="Enter your mobile number" required />
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value));
                  }}
                  placeholder="Password must be 8-16 characters"
                  required
                />
                <span className="toggle-password" onClick={() => setShowPassword(prev => !prev)}>
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
              {passwordError && <div className="invalid-feedback d-block">{passwordError}</div>}
            </div>

            <div className="form-group mb-3">
              <label className="form-label">Confirm Password</label>
              <div className="password-wrapper">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError(e.target.value !== password ? 'Passwords do not match!' : '');
                  }}
                  placeholder="Confirm your password"
                  required
                />
                <span className="toggle-password" onClick={() => setShowConfirmPassword(prev => !prev)}>
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <button type="submit" className="btn btn-gradient w-100 mb-3">
              Register
            </button>

            <div className="text-center">
              <span>Already have an account? <Link to="/login">Login</Link></span>
            </div>

          </form>
        </div>
      </div>

      <footer className="footer">
        <div className="container">
          <small>&copy; 2025 FeePay. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default SignupPage;
