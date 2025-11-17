import { Link } from 'react-router-dom';
import '../PageCss/FeaturesPage.css';


const FeaturesPage = () => {
  return (
      <div className="features-page">
        <nav className="navbar navbar-expand-lg navbar-dark custom-navbar">
        <div className="container">
          <Link className="navbar-brand fw-bold" to="/">
            <i className="bi bi-shield-check me-2"></i>
            FeePay
          </Link>
          <div className="navbar-nav ms-auto d-flex flex-row gap-3">
            <Link className="nav-link active" to="/features">
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
        <section className="features-hero">
          <div className="container">
            <div className="text-center">
              <h1 className="hero-title">
                Powerful <span className="brand-gradient">Features</span>
                <br />For Modern Universities
              </h1>
              <p className="hero-subtitle">
                Discover how FeePay revolutionizes university fee management with 
                cutting-edge features designed for students and administrators.
              </p>
            </div>
          </div>
        </section>

        {/* Core Features */}
        <section className="core-features">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title">Core Features</h2>
              <p className="section-subtitle">Everything you need for seamless fee management</p>
            </div>
            
            <div className="row g-4">
              <div className="col-lg-4 col-md-6">
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <i className="bi bi-shield-lock feature-icon"></i>
                  </div>
                  <h5>Bank-Grade Security</h5>
                  <p>Military-grade encryption and PCI DSS compliance ensure your financial data is always protected with industry-leading security protocols.</p>
                  <ul className="feature-list">
                    <li><i className="bi bi-check"></i> 256-bit SSL Encryption</li>
                    <li><i className="bi bi-check"></i> PCI DSS Compliance</li>
                    <li><i className="bi bi-check"></i> Multi-factor Authentication</li>
                    <li><i className="bi bi-check"></i> Real-time Fraud Detection</li>
                  </ul>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-6">
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <i className="bi bi-lightning-charge feature-icon"></i>
                  </div>
                  <h5>Lightning Fast Payments</h5>
                  <p>Process payments in under 30 seconds with our optimized payment gateway. No more waiting in long queues or dealing with slow systems.</p>
                  <ul className="feature-list">
                    <li><i className="bi bi-check"></i> 30 Second Processing</li>
                    <li><i className="bi bi-check"></i> Multiple Payment Methods</li>
                    <li><i className="bi bi-check"></i> Real-time Confirmation</li>
                    <li><i className="bi bi-check"></i> Auto-retry Failed Payments</li>
                  </ul>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-6">
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <i className="bi bi-file-earmark-pdf feature-icon"></i>
                  </div>
                  <h5>Smart Digital Receipts</h5>
                  <p>Automatically generated PDF receipts with QR codes for verification. Access your payment history anytime, anywhere with cloud storage.</p>
                  <ul className="feature-list">
                    <li><i className="bi bi-check"></i> QR Code Verification</li>
                    <li><i className="bi bi-check"></i> Cloud Storage</li>
                    <li><i className="bi bi-check"></i> Email Delivery</li>
                    <li><i className="bi bi-check"></i> Print-ready Format</li>
                  </ul>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-6">
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <i className="bi bi-bell-fill feature-icon"></i>
                  </div>
                  <h5>AI-Powered Reminders</h5>
                  <p>Never miss a payment deadline with intelligent reminders via email, SMS, and push notifications based on your payment patterns.</p>
                  <ul className="feature-list">
                    <li><i className="bi bi-check"></i> Smart Notifications</li>
                    <li><i className="bi bi-check"></i> Custom Reminder Schedule</li>
                    <li><i className="bi bi-check"></i> Multi-channel Alerts</li>
                    <li><i className="bi bi-check"></i> Payment History Analysis</li>
                  </ul>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-6">
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <i className="bi bi-graph-up feature-icon"></i>
                  </div>
                  <h5>Real-Time Analytics</h5>
                  <p>Track your payment history, spending patterns, and upcoming dues with beautiful charts and insights to manage your finances better.</p>
                  <ul className="feature-list">
                    <li><i className="bi bi-check"></i> Live Dashboard</li>
                    <li><i className="bi bi-check"></i> Spending Analytics</li>
                    <li><i className="bi bi-check"></i> Payment Trends</li>
                    <li><i className="bi bi-check"></i> Financial Reports</li>
                  </ul>
                </div>
              </div>
              
              <div className="col-lg-4 col-md-6">
                <div className="feature-card">
                  <div className="feature-icon-wrapper">
                    <i className="bi bi-headset feature-icon"></i>
                  </div>
                  <h5>24/7 Premium Support</h5>
                  <p>Get instant help from our expert support team through live chat, email, or phone. We're here to help you succeed, anytime.</p>
                  <ul className="feature-list">
                    <li><i className="bi bi-check"></i> Instant Response</li>
                    <li><i className="bi bi-check"></i> Multiple Support Channels</li>
                    <li><i className="bi bi-check"></i> Expert Technical Team</li>
                    <li><i className="bi bi-check"></i> Priority Student Support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advanced Features */}
        <section className="advanced-features">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title">Advanced Capabilities</h2>
              <p className="section-subtitle">Next-generation features for modern universities</p>
            </div>
            
            <div className="row align-items-center mb-5">
              <div className="col-lg-6">
                <div className="feature-content">
                  <h3>Automated Fee Management</h3>
                  <p>Our AI-powered system automatically calculates fees, applies discounts, and handles complex fee structures without manual intervention.</p>
                  <ul className="advanced-list">
                    <li><i className="bi bi-robot"></i> AI-powered calculations</li>
                    <li><i className="bi bi-percent"></i> Automatic discount application</li>
                    <li><i className="bi bi-calendar-check"></i> Semester-wise fee scheduling</li>
                    <li><i className="bi bi-gear"></i> Custom fee structure support</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="feature-visual">
                  <div className="visual-card">
                    <i className="bi bi-calculator"></i>
                    <h4>Smart Calculator</h4>
                    <p>Automated fee calculation with real-time updates</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row align-items-center mb-5">
              <div className="col-lg-6 order-lg-2">
                <div className="feature-content">
                  <h3>Multi-University Integration</h3>
                  <p>Seamlessly integrate with multiple university systems, supporting various ERP platforms and custom integrations.</p>
                  <ul className="advanced-list">
                    <li><i className="bi bi-building"></i> Multi-campus support</li>
                    <li><i className="bi bi-plug"></i> ERP system integration</li>
                    <li><i className="bi bi-cloud"></i> Cloud-based architecture</li>
                    <li><i className="bi bi-shield-check"></i> Secure API connections</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6 order-lg-1">
                <div className="feature-visual">
                  <div className="visual-card">
                    <i className="bi bi-diagram-3"></i>
                    <h4>System Integration</h4>
                    <p>Connect with existing university infrastructure</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="feature-content">
                  <h3>Advanced Reporting & Analytics</h3>
                  <p>Generate comprehensive reports with detailed analytics, helping universities make data-driven decisions about fee management.</p>
                  <ul className="advanced-list">
                    <li><i className="bi bi-bar-chart"></i> Real-time reporting</li>
                    <li><i className="bi bi-pie-chart"></i> Visual analytics dashboard</li>
                    <li><i className="bi bi-download"></i> Export to multiple formats</li>
                    <li><i className="bi bi-calendar-event"></i> Scheduled report delivery</li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="feature-visual">
                  <div className="visual-card">
                    <i className="bi bi-graph-up-arrow"></i>
                    <h4>Analytics Dashboard</h4>
                    <p>Comprehensive insights and reporting tools</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section className="integration-section">
          <div className="container">
            <div className="text-center mb-5">
              <h2 className="section-title">Seamless Integrations</h2>
              <p className="section-subtitle">Connect with your existing systems effortlessly</p>
            </div>
            
            <div className="row">
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="integration-card">
                  <i className="bi bi-credit-card"></i>
                  <h5>Payment Gateways</h5>
                  <p>Razorpay, Stripe, PayPal, and more</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="integration-card">
                  <i className="bi bi-bank"></i>
                  <h5>Banking Partners</h5>
                  <p>Direct integration with major banks</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="integration-card">
                  <i className="bi bi-envelope"></i>
                  <h5>Email Services</h5>
                  <p>SendGrid, Mailgun, Amazon SES</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 mb-4">
                <div className="integration-card">
                  <i className="bi bi-chat-dots"></i>
                  <h5>SMS Providers</h5>
                  <p>Twilio, AWS SNS, and local providers</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="features-cta">
          <div className="container">
            <div className="text-center">
              <h2 className="cta-title">Ready to Experience These Features?</h2>
              <p className="cta-subtitle">
                Join thousands of students and universities already using FeePay's powerful features.
              </p>
              <div className="cta-buttons">
                <Link to="/signup" className="btn btn-primary-gradient btn-lg">
                  <i className="bi bi-rocket-takeoff me-2"></i>
                  Start Free Trial
                </Link>
                <Link to="/" className="btn btn-outline-light btn-lg">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default FeaturesPage;