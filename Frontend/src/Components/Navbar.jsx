import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ noBlur }) => {
  return (
    <nav className={`navbar ${noBlur ? 'no-blur' : ''}`}>
      <Link to="/" className="logo">Landing Page</Link>

      <style>{`
        .navbar {
          padding: 15px 40px;
          display: flex;
          justify-content: start;
          align-items: center;
          position: absolute;
          top: 0;
          z-index: 10;
        }

        .navbar:not(.no-blur) {
          backdrop-filter: blur(12px);
          background: rgba(255, 255, 255, 0.15);
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }

        .navbar.no-blur {
          background: rgba(255, 255, 255, 0.95);
          border-bottom: 1px solid #ccc;
        }

        .logo {
          font-size: 1.3rem;
          font-weight: bold;
          color: #333;
          text-decoration: none;
        }

        .logo:hover {
          text-decoration: underline;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
