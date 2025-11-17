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

  // Only update the validation message and feedback, not logic
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
    
    // Validate password
    const passwordValidationError = validatePassword(password);
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
      return;
    }

    // Validate confirm password
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match!");
      return;
    }

    try {
      const data = { name, email, password, mobile_no };
      const response = await api.post("/users/register", data);
      console.log("response", response);
      navigate("/login");
    } catch (err) {
      console.error("Error during registration:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="signup-bg">
      {/* Navbar */}
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
              <Link className="nav-link" to="/login">
                <i className="bi bi-box-arrow-in-right me-1"></i>
                Student Login
              </Link>
              <Link className="nav-link admin-nav" to="/admin-login">
                <i className="bi bi-shield-lock me-1"></i>
                Admin
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Signup container */}
      <div className="signup-container">
        <div className="signup-box glass-effect">
          <div className="signup-avatar">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Avatar" />
          </div>
          <h3 className="text-center mb-4">Student Registration</h3>
          <form onSubmit={handleSubmit}>
            <div className="form-group mb-3">
              <label htmlFor="name" className="form-label">Full Name</label>
              <input 
                type="text" 
                className="form-control" 
                id="name" 
                value={name} 
                onChange={e => setName(e.target.value)} 
                placeholder="Enter your full name"
                required 
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-control" 
                id="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                placeholder="Enter your email"
                required 
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="mobile_no" className="form-label">Mobile Number</label>
              <input 
                type="text" 
                className="form-control" 
                id="mobile_no" 
                value={mobile_no} 
                onChange={e => setMobileNo(e.target.value)} 
                placeholder="Enter your mobile number"
                required 
              />
            </div>
            <div className="form-group mb-3">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-wrapper">
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                  id="password" 
                  value={password} 
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError(validatePassword(e.target.value));
                    if (confirmPassword) {
                      setConfirmPasswordError(e.target.value !== confirmPassword ? 'Passwords do not match!' : '');
                    }
                  }}
                  placeholder="Password must be 8-16 characters"
                  required 
                  minLength="8"
                  maxLength="16"
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(prev => !prev)}
                  role="button"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
              {passwordError && (
                <div className="invalid-feedback d-block">
                  {passwordError}
                </div>
              )}
            </div>
            <div className="form-group mb-3">
              <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
              <div className="password-wrapper">
                <input 
                  type={showConfirmPassword ? 'text' : 'password'} 
                  className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                  id="confirmPassword" 
                  value={confirmPassword} 
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setConfirmPasswordError(e.target.value !== password ? 'Passwords do not match!' : '');
                  }}
                  placeholder="Password must be 8-16 characters"
                  required 
                  minLength="8"
                  maxLength="16"
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowConfirmPassword(prev => !prev)}
                  role="button"
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-gradient w-100 mb-3">
              <i className="bi bi-person-plus me-2"></i>
              Register
            </button>
            <div className="text-center">
              <span>Already have an account? <Link to="/login" className="signup-link">Login</Link></span>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <small>&copy; 2025 FeePay. All rights reserved.</small>
        </div>
      </footer>
    </div>
  );
}

export default SignupPage;