import { Link } from 'react-router-dom';
import '../PageCss/LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="bi bi-shield-check me-2"></i>
            FeePay
          </Link>
          <div className="navbar-nav ms-auto d-flex flex-row gap-3">
            
            <Link className="nav-link" to="/features">
            <i className="bi bi-star me-1"></i>
            Features</Link>
            <Link className="nav-link" to="/about">
            <i className="bi bi-info-circle me-1"></i>
            About</Link>
            <Link className="nav-link" to="/login">
            <i className="bi bi-box-arrow-in-right me-1"></i>
            Student Login</Link>
            <Link className="nav-link signup-nav" to="/signup">
            <i className="bi bi-person-plus me-1"></i>
            Student Registration</Link>
            <Link className="nav-link admin-nav" to="/admin-login">
            <i className="bi bi-shield-lock me-1"></i>
            Admin</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="hero-section">
        <div className="hero-particles"></div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <div className="hero-content">
                <h1 className="hero-title">
                  Transform Your 
                  <span className="brand-gradient"> Fee Payments</span>
                  <br />Into Seamless Experiences
                </h1>
                <p className="hero-subtitle">
                  The most advanced university fee payment platform. Secure, instant, and hassle-free transactions with real-time tracking and automated receipts.
                </p>
                <div className="hero-stats">
                  <div className="stat">
                    <div className="stat-number">50K+</div>
                    <div className="stat-label">Students Trust Us</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">99.9%</div>
                    <div className="stat-label">Uptime Guarantee</div>
                  </div>
                  <div className="stat">
                    <div className="stat-number">24/7</div>
                    <div className="stat-label">Support Available</div>
                  </div>
                </div>
                <div className="hero-buttons">
                  <Link to="/signup" className="btn btn-primary-gradient">
                    <i className="bi bi-rocket-takeoff me-2"></i>
                    Start Free Today
                  </Link>
                  <Link to="/login" className="btn btn-outline-light">
                    <i className="bi bi-box-arrow-in-right me-2"></i>
                    Student Login
                  </Link>
                </div>
                <div className="trust-indicators">
                  <span className="trust-badge">
                    <i className="bi bi-shield-fill-check text-success"></i>
                    Bank-Level Security
                  </span>
                  <span className="trust-badge">
                    <i className="bi bi-lightning-charge text-warning"></i>
                    Instant Processing
                  </span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <div className="floating-card card-1">
                  <i className="bi bi-credit-card-2-front"></i>
                  <span>Secure Payments</span>
                </div>
                <div className="floating-card card-2">
                  <i className="bi bi-receipt"></i>
                  <span>Instant Receipts</span>
                </div>
                <div className="floating-card card-3">
                  <i className="bi bi-bell-fill"></i>
                  <span>Smart Reminders</span>
                </div>
                <div className="hero-mockup">
                  <div className="mockup-screen">
                    <div className="mockup-header">
                      <div className="mockup-dots">
                        <span></span><span></span><span></span>
                      </div>
                    </div>
                    <div className="mockup-content">
                      <div className="payment-preview">
                        <h4>Fee Payment</h4>
                        <div className="amount">₹15,000</div>
                        <div className="payment-method">
                          <i className="bi bi-credit-card"></i>
                          <span>Card Payment</span>
                        </div>
                        <div className="pay-button">Pay Now</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Why Choose FeePay?</h2>
            <p className="section-subtitle">
              Experience the future of university fee payments with our cutting-edge platform
            </p>
          </div>
          
          <div className="row g-4">
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <i className="bi bi-shield-lock feature-icon"></i>
                </div>
                <h5>Bank-Grade Security</h5>
                <p>Military-grade encryption and PCI DSS compliance ensure your financial data is always protected with industry-leading security protocols.</p>
                <div className="feature-highlight">256-bit SSL Encryption</div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <i className="bi bi-lightning-charge feature-icon"></i>
                </div>
                <h5>Lightning Fast Payments</h5>
                <p>Process payments in under 30 seconds with our optimized payment gateway. No more waiting in long queues or dealing with slow systems.</p>
                <div className="feature-highlight">30 Second Processing</div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <i className="bi bi-file-earmark-pdf feature-icon"></i>
                </div>
                <h5>Smart Digital Receipts</h5>
                <p>Automatically generated PDF receipts with QR codes for verification. Access your payment history anytime, anywhere with cloud storage.</p>
                <div className="feature-highlight">QR Code Verification</div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <i className="bi bi-bell-fill feature-icon"></i>
                </div>
                <h5>AI-Powered Reminders</h5>
                <p>Never miss a payment deadline with intelligent reminders via email, SMS, and push notifications based on your payment patterns.</p>
                <div className="feature-highlight">Smart Notifications</div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <i className="bi bi-graph-up feature-icon"></i>
                </div>
                <h5>Real-Time Analytics</h5>
                <p>Track your payment history, spending patterns, and upcoming dues with beautiful charts and insights to manage your finances better.</p>
                <div className="feature-highlight">Live Dashboard</div>
              </div>
            </div>
            
            <div className="col-lg-4 col-md-6">
              <div className="feature-card">
                <div className="feature-icon-wrapper">
                  <i className="bi bi-headset feature-icon"></i>
                </div>
                <h5>24/7 Premium Support</h5>
                <p>Get instant help from our expert support team through live chat, email, or phone. We're here to help you succeed, anytime.</p>
                <div className="feature-highlight">Instant Response</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="bi bi-people-fill"></i>
                </div>
                <div className="stat-number">50,000+</div>
                <div className="stat-label">Active Students</div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="bi bi-building"></i>
                </div>
                <div className="stat-number">200+</div>
                <div className="stat-label">Universities</div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="bi bi-currency-rupee"></i>
                </div>
                <div className="stat-number">₹500Cr+</div>
                <div className="stat-label">Processed</div>
              </div>
            </div>
            <div className="col-lg-3 col-6">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="bi bi-star-fill"></i>
                </div>
                <div className="stat-number">4.9/5</div>
                <div className="stat-label">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center">
              <h2 className="cta-title">Ready to Transform Your Payment Experience?</h2>
              <p className="cta-subtitle">
                Join thousands of students who have already made the switch to smarter, faster, and more secure fee payments.
              </p>
              <div className="cta-buttons">
                <Link to="/signup" className="btn btn-primary-gradient btn-lg">
                  <i className="bi bi-rocket-takeoff me-2"></i>
                  Get Started Free
                </Link>
                <Link to="/admin-login" className="btn btn-outline-primary btn-lg">
                  <i className="bi bi-building me-2"></i>
                  For Institutions
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="footer-brand">
                <h5>
                  <i className="bi bi-shield-check me-2"></i>
                  FeePay
                </h5>
                <p>Revolutionizing university fee payments with cutting-edge technology and unmatched security.</p>
                <div className="social-links">
                  <a href="#"><i className="bi bi-twitter"></i></a>
                  <a href="#"><i className="bi bi-linkedin"></i></a>
                  <a href="#"><i className="bi bi-instagram"></i></a>
                  <a href="#"><i className="bi bi-facebook"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6>Product</h6>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#security">Security</a></li>
                <li><a href="#api">API</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6>Support</h6>
              <ul className="footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#status">System Status</a></li>
                <li><a href="#docs">Documentation</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6>Company</h6>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-6 mb-4">
              <h6>Legal</h6>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#compliance">Compliance</a></li>
                <li><a href="#licenses">Licenses</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="row align-items-center">
              <div className="col-md-6">
                <p>&copy; 2025 FeePay by FeeFlow Solutions. All rights reserved.</p>
              </div>
              <div className="col-md-6 text-md-end">
                <div className="footer-badges">
                  <span className="badge">PCI DSS Compliant</span>
                  <span className="badge">ISO 27001 Certified</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;