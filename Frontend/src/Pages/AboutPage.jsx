import { Link } from 'react-router-dom';
import '../PageCss/AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
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
            <Link className="nav-link active" to="/about">
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
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">About <span className="brand-gradient">FeePay</span></h1>
              <p className="hero-subtitle">
                Revolutionizing university fee payments with cutting-edge technology, 
                unmatched security, and seamless user experiences since 2024.
              </p>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">2024</div>
                  <div className="stat-label">Founded</div>
                </div>
                <div className="stat">
                  <div className="stat-number">50K+</div>
                  <div className="stat-label">Students Served</div>
                </div>
                <div className="stat">
                  <div className="stat-number">200+</div>
                  <div className="stat-label">Universities</div>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <div className="image-card">
                  <i className="bi bi-people-fill"></i>
                  <h3>Our Team</h3>
                  <p>Dedicated professionals working 24/7</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mb-4">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="bi bi-target"></i>
                </div>
                <h3>Our Mission</h3>
                <p>To simplify and digitize university fee payments, making education more accessible by removing financial barriers and administrative hassles.</p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="bi bi-eye"></i>
                </div>
                <h3>Our Vision</h3>
                <p>To become the leading global platform for educational payments, empowering millions of students worldwide with seamless financial solutions.</p>
              </div>
            </div>
            <div className="col-lg-4 mb-4">
              <div className="mission-card">
                <div className="mission-icon">
                  <i className="bi bi-heart"></i>
                </div>
                <h3>Our Values</h3>
                <p>Security, transparency, innovation, and student-first approach guide every decision we make in building the future of education finance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h2 className="section-title">Our Story</h2>
              <p className="story-text">
                FeePay was born from a simple observation: students and universities were struggling with 
                outdated payment systems that were slow, insecure, and frustrating to use.
              </p>
              <p className="story-text">
                Founded by a team of passionate developers and education advocates, we set out to create 
                a platform that would transform how educational institutions handle fee collection and 
                how students manage their payments.
              </p>
              <p className="story-text">
                Today, we're proud to serve over 50,000 students across 200+ universities, processing 
                millions in payments with 99.9% uptime and bank-grade security.
              </p>
              <div className="story-highlights">
                <div className="highlight">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>PCI DSS Compliant</span>
                </div>
                <div className="highlight">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>ISO 27001 Certified</span>
                </div>
                <div className="highlight">
                  <i className="bi bi-check-circle-fill"></i>
                  <span>99.9% Uptime</span>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="story-image">
                <div className="timeline">
                  <div className="timeline-item">
                    <div className="timeline-year">2024</div>
                    <div className="timeline-content">
                      <h4>Company Founded</h4>
                      <p>FeePay launched with our first university partner</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-year">2024</div>
                    <div className="timeline-content">
                      <h4>10K Students</h4>
                      <p>Reached our first major milestone</p>
                    </div>
                  </div>
                  <div className="timeline-item">
                    <div className="timeline-year">2025</div>
                    <div className="timeline-content">
                      <h4>50K+ Students</h4>
                      <p>Expanded to 200+ universities nationwide</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="section-title">Meet Our Team</h2>
            <p className="section-subtitle">The brilliant minds behind FeePay's success</p>
          </div>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="team-card">
                <div className="team-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
                <h4>FeeFlow Solutions Team</h4>
                <p className="team-role">Founders & Developers</p>
                <p className="team-bio">Passionate about creating innovative solutions for educational technology.</p>
                <div className="team-social">
                  <a href="#"><i className="bi bi-linkedin"></i></a>
                  <a href="#"><i className="bi bi-twitter"></i></a>
                  <a href="#"><i className="bi bi-github"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="team-card">
                <div className="team-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
                <h4>Engineering Team</h4>
                <p className="team-role">Full-Stack Developers</p>
                <p className="team-bio">Expert developers ensuring robust, scalable, and secure payment solutions.</p>
                <div className="team-social">
                  <a href="#"><i className="bi bi-linkedin"></i></a>
                  <a href="#"><i className="bi bi-twitter"></i></a>
                  <a href="#"><i className="bi bi-github"></i></a>
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="team-card">
                <div className="team-avatar">
                  <i className="bi bi-person-circle"></i>
                </div>
                <h4>Support Team</h4>
                <p className="team-role">Customer Success</p>
                <p className="team-bio">Dedicated to providing 24/7 support and ensuring student satisfaction.</p>
                <div className="team-social">
                  <a href="#"><i className="bi bi-linkedin"></i></a>
                  <a href="#"><i className="bi bi-twitter"></i></a>
                  <a href="#"><i className="bi bi-github"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 mx-auto text-center">
              <h2 className="section-title">Get In Touch</h2>
              <p className="section-subtitle mb-4">
                Have questions about FeePay? We'd love to hear from you.
              </p>
              <div className="contact-info">
                <div className="contact-item">
                  <i className="bi bi-envelope-fill"></i>
                  <div>
                    <h5>Email Us</h5>
                    <p>support@feepay.com</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="bi bi-telephone-fill"></i>
                  <div>
                    <h5>Call Us</h5>
                    <p>+91 1234567890</p>
                  </div>
                </div>
                <div className="contact-item">
                  <i className="bi bi-geo-alt-fill"></i>
                  <div>
                    <h5>Visit Us</h5>
                    <p>Bangalore, Karnataka, India</p>
                  </div>
                </div>
              </div>
              <div className="contact-buttons">
                <Link to="/signup" className="btn btn-primary-gradient">
                  <i className="bi bi-rocket-takeoff me-2"></i>
                  Get Started Today
                </Link>
                <Link to="/" className="btn btn-outline-primary">
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to Home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;