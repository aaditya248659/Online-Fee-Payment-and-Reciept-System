import React, { useState } from 'react';
import '../PageCss/AdminLoginPage.css';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function AdminLoginPage() {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post('http://localhost:5000/api/users/admin-login', formData);
      if (response.data.token && response.data.isAdmin) {
        localStorage.setItem('admin_token', response.data.token);
        navigate('/admin-dashboard');
      } else {
        alert('Admin login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Admin login error:', err);
      alert('Admin login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-login-bg">
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
              <Link className="nav-link" to="/signup">
                <i className="bi bi-person-plus me-1"></i>
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Admin Login container */}
      <div className="admin-login-container">
        <div className="admin-login-box glass-effect">
          <div className="admin-avatar">
            <img 
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" 
              alt="Admin Avatar" 
            />
          </div>
          
          <h2 className="admin-title">Admin Login</h2>
          <p className="admin-subtitle">Access administrative dashboard</p>
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter admin email"
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter admin password"
                  required
                  disabled={loading}
                  autoComplete="current-password"
                />
                <span
                  className="toggle-password"
                  onClick={() => setShowPassword(prev => !prev)}
                  role="button"
                  tabIndex={0}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setShowPassword(prev => !prev);
                    }
                  }}
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>
            
            <button 
              type="submit" 
              className="btn-admin"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="bi bi-shield-lock me-2"></i>
                  Admin Login
                </>
              )}
            </button>
          </form>

          <div className="admin-features">
            <h6>Admin Features</h6>
            <ul className="feature-list">
              <li><i className="bi bi-people"></i> Manage Students</li>
              <li><i className="bi bi-bar-chart"></i> View Analytics</li>
              <li><i className="bi bi-credit-card"></i> Payment Management</li>
              <li><i className="bi bi-gear"></i> System Settings</li>
            </ul>
          </div>

          <div className="back-link">
            <Link to="/login">← Back to Student Login</Link>
          </div>
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

export default AdminLoginPage;