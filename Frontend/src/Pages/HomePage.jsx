import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from "../useApi";
import '../PageCss/HomePage.css';

function HomePage() {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      // const token = localStorage.getItem('token');
      // if (!token) {
      //   navigate('/login');
      //   return;
      // }
      
      const response = await api.get('/users/me');
      
      setUser(response.data);
      setEditData(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching user:', err);
      localStorage.removeItem('token');
      localStorage.removeItem('user_id');
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    navigate('/');
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put('/users/me', editData);
      
      setUser(editData);
      setEditing(false);
      
      // Show success notification
      showNotification('Profile updated successfully!');
    } catch (err) {
      console.error('Error updating user:', err);
      alert('Error updating profile. Please try again.');
    }
  };

  const showNotification = (message) => {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <i class="bi bi-check-circle-fill" style="color: #28a745; font-size: 1.2rem;"></i>
        <span>${message}</span>
      </div>
    `;
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  };

  if (loading) {
    return (
      <div className="home-page">
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <div className="text-center">
            <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3 text-muted">Loading your dashboard...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="home-page">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-shield-check"></i>
            FeePay
          </Link>
          <div className="navbar-nav ms-auto d-flex flex-row gap-3 align-items-center">
            <Link className="nav-link" to="/payment">
              <i className="bi bi-credit-card me-1"></i>
              Make Payment
            </Link>
            <button className="logout-btn" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i>
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="container">
            <div className="text-center">
              <h1 className="welcome-title">
                Welcome back, <span style={{ color: '#ffd700' }}>{user.name}!</span>
              </h1>
              <p className="welcome-subtitle">
                Manage your fees, track payments, and stay updated with your academic finances.
              </p>
              
              <div className="welcome-stats">
                <div className="stat-item">
                  <div className="stat-number">₹0</div>
                  <div className="stat-label">Pending Dues</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">5</div>
                  <div className="stat-label">Total Payments</div>
                </div>
                <div className="stat-item">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Payment Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section className="dashboard-section">
          <div className="container">
            <div className="dashboard-grid">
              
              {/* Profile Management Card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="bi bi-person-circle"></i>
                  </div>
                  <h3 className="card-title">Profile Information</h3>
                </div>

                {!editing ? (
                  <>
                    <div className="profile-info">
                      <div className="info-item">
                        <i className="bi bi-envelope info-icon"></i>
                        <div className="info-content">
                          <h6>Email Address</h6>
                          <p>{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <i className="bi bi-phone info-icon"></i>
                        <div className="info-content">
                          <h6>Mobile Number</h6>
                          <p>{user.mobile_no || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <i className="bi bi-hash info-icon"></i>
                        <div className="info-content">
                          <h6>Roll Number</h6>
                          <p>{user.roll_no || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <i className="bi bi-book info-icon"></i>
                        <div className="info-content">
                          <h6>Course</h6>
                          <p>{user.course || 'Not provided'}</p>
                        </div>
                      </div>
                      
                      <div className="info-item">
                        <i className="bi bi-calendar info-icon"></i>
                        <div className="info-content">
                          <h6>Semester</h6>
                          <p>{user.semester || 'Not provided'}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="quick-actions">
                      <button className="btn btn-primary" onClick={() => setEditing(true)}>
                        <i className="bi bi-pencil-square"></i>
                        Edit Profile
                      </button>
                    </div>
                  </>
                ) : (
                  <form onSubmit={handleUpdate} className="edit-form">
                    <div className="form-row">
                      <div className="form-group">
                        <label>Mobile Number</label>
                        <input 
                          name="mobile_no" 
                          value={editData.mobile_no || ''} 
                          onChange={handleChange}
                          placeholder="Enter mobile number"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Roll Number</label>
                        <input 
                          name="roll_no" 
                          value={editData.roll_no || ''} 
                          onChange={handleChange}
                          placeholder="Enter roll number"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Course</label>
                        <input 
                          name="course" 
                          value={editData.course || ''} 
                          onChange={handleChange}
                          placeholder="Enter course name"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Semester</label>
                        <input 
                          name="semester" 
                          value={editData.semester || ''} 
                          onChange={handleChange}
                          placeholder="Enter semester"
                        />
                      </div>
                    </div>
                    
                    <div className="quick-actions">
                      <button className="btn btn-success" type="submit">
                        <i className="bi bi-check-lg"></i>
                        Save Changes
                      </button>
                      <button 
                        className="btn btn-secondary" 
                        type="button"
                        onClick={() => setEditing(false)}
                      >
                        <i className="bi bi-x-lg"></i>
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>

              {/* Payment Overview Card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="bi bi-credit-card"></i>
                  </div>
                  <h3 className="card-title">Payment Overview</h3>
                </div>

                <div className="payment-status">
                  <i className="bi bi-check-circle-fill status-icon"></i>
                  <div>
                    <h6 style={{ margin: 0, fontWeight: 600 }}>All fees are up to date!</h6>
                    <p style={{ margin: 0, fontSize: '0.9rem', color: '#6c757d' }}>No pending payments</p>
                  </div>
                </div>

                <div style={{ background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px', marginBottom: '1.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontWeight: 600, color: '#1a1a1a' }}>Current Semester Fee</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0066ff' }}>₹15,000</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', color: '#6c757d' }}>
                    <span>Due Date: March 30, 2025</span>
                    <span style={{ color: '#28a745', fontWeight: 600 }}>Paid ✓</span>
                  </div>
                </div>

                <div className="quick-actions">
                  <Link to="/payment" className="btn btn-payment">
                    <i className="bi bi-plus-circle"></i>
                    Make New Payment
                  </Link>
                </div>
              </div>

              {/* Recent Activity Card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="bi bi-clock-history"></i>
                  </div>
                  <h3 className="card-title">Recent Activity</h3>
                </div>

                <div>
                  <div className="activity-item">
                    <div className="activity-icon">
                      <i className="bi bi-check"></i>
                    </div>
                    <div className="activity-content">
                      <h6>Payment Successful</h6>
                      <p>Semester fee payment of ₹15,000 • 2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <div className="activity-icon">
                      <i className="bi bi-person"></i>
                    </div>
                    <div className="activity-content">
                      <h6>Profile Updated</h6>
                      <p>Mobile number updated • 1 week ago</p>
                    </div>
                  </div>
                  
                  <div className="activity-item">
                    <div className="activity-icon">
                      <i className="bi bi-bell"></i>
                    </div>
                    <div className="activity-content">
                      <h6>Reminder Sent</h6>
                      <p>Fee payment reminder via email • 2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links Card */}
              <div className="dashboard-card">
                <div className="card-header">
                  <div className="card-icon">
                    <i className="bi bi-lightning"></i>
                  </div>
                  <h3 className="card-title">Quick Actions</h3>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <Link to="/payment" className="btn btn-primary" style={{ textDecoration: 'none' }}>
                    <i className="bi bi-credit-card"></i>
                    Make Payment
                  </Link>
                  
                  <button className="btn btn-secondary" onClick={() => window.print()}>
                    <i className="bi bi-download"></i>
                    Download Receipt
                  </button>
                  
                  <button className="btn btn-secondary">
                    <i className="bi bi-headset"></i>
                    Contact Support
                  </button>
                  
                  <Link to="/" className="btn btn-secondary" style={{ textDecoration: 'none' }}>
                    <i className="bi bi-house"></i>
                    Back to Home
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default HomePage;