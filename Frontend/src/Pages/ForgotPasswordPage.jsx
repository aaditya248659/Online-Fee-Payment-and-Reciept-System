import { useState } from 'react';
import '../PageCss/ForgotPasswordPage.css'; 
import { Link } from 'react-router-dom';
import axios from 'axios';

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [resetUrl, setResetUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const response = await axios.post('http://localhost:5000/api/users/forgot-password', {
        email: email
      });
      setSubmitted(true);
      setResetUrl(response.data.resetUrl);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        setError('User with this email does not exist');
      } else {
        setError('Error processing reset request. Please try again.');
      }
      console.error('Forgot password error:', err);
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

      {/* Forgot Password container */}
      <div className="signup-bg d-flex align-items-center justify-content-center min-vh-100">
        <div className="signup-box glass-effect shadow-lg p-4">
          <div className="login-avatar mb-3">
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="User Avatar" />
          </div>
          <h3 className="mb-4 text-center fw-bold">Forgot Password</h3>
          {submitted ? (
            <div className="alert alert-success">
              <h4>Password Reset Link Generated!</h4>
              <p>Here's your reset link:</p>
              <Link 
                to={`/reset-password/${resetUrl ? resetUrl.split('/').pop() : ''}`}
                className="btn btn-primary mb-3"
              >
                Reset Password
              </Link>
              <small className="text-muted d-block mb-3">
                  In a real application, this would be sent to your email.
              </small>
              <Link to="/login" className="signup-link">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  required
                />
              </div>
              <button type="submit" className="btn btn-gradient w-100 mb-2" disabled={loading}>
                <i className="bi bi-send me-2"></i>
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              {error && <div className="text-danger text-center mt-2">{error}</div>}
              <div className="text-center mt-3">
                <Link to="/login" className="signup-link">Back to Login</Link>
              </div>
            </form>
          )}
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

export default ForgotPasswordPage;
