import React, { useState, useEffect } from 'react';
import '../PageCss/LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import api from '../useApi';

function LoginPages() {

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/users/login', formData);

      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id);

        navigate('/home');
      } else {
        alert('Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Login failed. Try again.');
    }
  };

  return (
    <div className="login-bg">

      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-shield-check"></i> FeePay
          </Link>
        </div>
      </nav>

      <div className="login-container">
        <div className="login-box glass-effect">

          <div className="login-avatar">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Avatar" />
          </div>

          <h2 className="text-center mb-4">Student Login</h2>

          <form onSubmit={handleSubmit}>

            <div className="form-group mb-3">
              <label>Email</label>
              <input type="email" name="email" value={formData.email}
                onChange={handleChange} className="form-control"
                required />
            </div>

            <div className="form-group mb-3">
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

            <button type="submit" className="btn btn-gradient w-100">
              Log In
            </button>

            <div className="text-center mt-2">
              <Link to="/forgot-password">Forgot password?</Link>
            </div>

            <div className="text-center mt-3">
              <span>Don't have an account? <Link to="/signup">Register</Link></span>
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

export default LoginPages;
