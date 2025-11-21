import React, { useState } from 'react';
import '../PageCss/AdminLoginPage.css';
import { useNavigate, Link } from 'react-router-dom';
import api from '../useApi';

function AdminLoginPage() {

  const [formData, setFormData] = useState({
    email: '', password: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/admin-login', formData);

      if (response.data.token && response.data.isAdmin) {

        localStorage.setItem('admin_token', response.data.token);
        navigate('/admin-dashboard');

      } else {
        alert("Invalid admin credentials!");
      }

    } catch (err) {
      console.error("Admin login error:", err);
      alert("Admin login failed");
    }
  };

  return (
    <div className="admin-login-bg">

      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-shield-check"></i> FeePay
          </Link>
        </div>
      </nav>

      <div className="admin-login-container">
        <div className="admin-login-box glass-effect">

          <div className="admin-avatar">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="" />
          </div>

          <h2 className="admin-title">Admin Login</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email}
                onChange={handleChange} className="form-control" required />
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="password-wrapper">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password" value={formData.password}
                  onChange={handleChange} className="form-control" required
                />
                <span className="toggle-password" onClick={() => setShowPassword(p => !p)}>
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            <button type="submit" className="btn-admin">
              Admin Login
            </button>

          </form>

          <div className="back-link">
            <Link to="/login">← Back to Student Login</Link>
          </div>

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

export default AdminLoginPage;
