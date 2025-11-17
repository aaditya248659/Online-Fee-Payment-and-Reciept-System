import React, { useState, useEffect } from 'react';
import '../PageCss/LoginPage.css';
import { Link, useNavigate } from 'react-router-dom';
import api from "../useApi";

function LoginPages() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Remove token on back/forward navigation
        const handlePopState = () => {
            localStorage.removeItem('token');
        };
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('popstate', handlePopState);
        };
    }, [navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/users/login', formData);
            if (response.data.token) {
                // Make sure both are stored
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user_id', response.data.user_id);
                
                console.log('Token stored:', localStorage.getItem('token')); // Debug log
                console.log('User ID stored:', localStorage.getItem('user_id')); // Debug log
                
                navigate('/home');
            } else {
                alert('Login failed. Please check your credentials.');
            }
        } catch (err) {
            console.error('Error during login:', err);
            alert('Login failed. Please try again.');
        }
    };

    return (
        <div className="login-bg">
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

            {/* Login container */}
            <div className="login-container">
                <div className="login-box glass-effect">
                    <div className="login-avatar">
                        <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Avatar" />
                    </div>
                    <h2 className="text-center mb-4">Student Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <div className="password-wrapper">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    className="form-control"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
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
                        <div className="d-flex justify-content-end mb-3">
                            <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
                        </div>
                        <button type="submit" className="btn btn-gradient w-100 mb-2">
                            <i className="bi bi-box-arrow-in-right me-2"></i>
                            Log In
                        </button>
                        <div className="text-center">
                            <span>Don't have an account? <Link to="/signup" className="signup-link">Register</Link></span>
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

export default LoginPages;