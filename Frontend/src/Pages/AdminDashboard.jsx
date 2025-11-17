import React, { useEffect, useState } from 'react';
import api from "../useApi";
import axios from "axios";
import { useNavigate, Link } from 'react-router-dom';
import '../PageCss/AdminDashboard.css';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  // Fetch users on mount
  useEffect(() => {
    fetchUsers();
  }, []);

  // Force logout on navigation
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (!token) {
      navigate('/admin-login', { replace: true });
    }
  }, [navigate]);

  useEffect(() => {
    const handlePopState = () => {
      localStorage.removeItem('admin_token');
      navigate('/admin-login', { replace: true });
    };
    window.addEventListener('popstate', handlePopState);
    return () => {
      localStorage.removeItem('admin_token');
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await api.get('/users/all');
      setUsers(res.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleEdit = (user) => {
    setEditingId(user.id);
    setEditData({
      name: user.name || '',
      email: user.email || '',
      mobile_no: user.mobile_no || '',
      roll_no: user.roll_no || '',
      course: user.course || '',
      semester: user.semester || '',
      feeDue: user.feeDue || '',
      dueDate: user.dueDate ? user.dueDate.slice(0, 10) : ''
    });
  };

  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await api.put(`/users/${id}`, editData);
      
      // Show success alert
      alert('Student updated successfully!');
      
      // Reset editing state
      setEditingId(null);
      
      // Refresh the users list
      fetchUsers();
    } catch (err) {
      console.error('Error updating student:', err);
      alert('Error updating student. Please try again.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    navigate('/admin-login');
  };

  return (
    <div className="admin-dashboard">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <i className="bi bi-shield-check"></i>
            FeePay
            <span className="admin-badge">Admin</span>
          </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav ms-auto d-flex flex-row gap-3 align-items-center">
              <Link className="nav-link" to="/">
                <i className="bi bi-house me-1"></i>
                Home
              </Link>
              <Link className="nav-link" to="#" onClick={(e) => { e.preventDefault(); window.location.reload(); }}>
                <i className="bi bi-arrow-clockwise me-1"></i>
                Refresh
              </Link>
              <button className="logout-btn" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="main-content">
        {/* Dashboard Header */}
        <section className="dashboard-header">
          <div className="container">
            <div className="text-center">
              <h1 className="dashboard-title">
                Admin Dashboard
              </h1>
              <p className="dashboard-subtitle">
                Manage students, track payments, and oversee system operations.
              </p>
              
              <div className="admin-stats">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-people"></i>
                  </div>
                  <div className="stat-number">{users.length}</div>
                  <div className="stat-label">Total Students</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-check-circle"></i>
                  </div>
                  <div className="stat-number">{users.filter(u => !u.feeDue || u.feeDue === 0).length}</div>
                  <div className="stat-label">Paid Students</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-exclamation-circle"></i>
                  </div>
                  <div className="stat-number">{users.filter(u => u.feeDue && u.feeDue > 0).length}</div>
                  <div className="stat-label">Pending Payments</div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="bi bi-currency-rupee"></i>
                  </div>
                  <div className="stat-number">₹{users.reduce((sum, u) => sum + (u.feeDue || 0), 0).toLocaleString()}</div>
                  <div className="stat-label">Total Due</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Students Management Section */}
        <section className="students-section">
          <div className="container">
            <div className="section-header">
              <h2 className="section-title">Student Management</h2>
              <p className="section-subtitle">View and manage all registered students</p>
            </div>

            <div className="table-container">
              <div className="table-responsive">
                <table className="modern-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Roll No</th>
                      <th>Course</th>
                      <th>Semester</th>
                      <th>Fee Due</th>
                      <th>Due Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className={editingId === u.id ? 'editing-row' : ''}>
                        <td>
                          {editingId === u.id ? (
                            <input 
                              name="name" 
                              value={editData.name} 
                              onChange={handleChange}
                              className="table-input"
                            />
                          ) : (
                            <span>{u.name}</span>
                          )}
                        </td>
                        <td>
                          {editingId === u.id ? (
                            <input 
                              name="email" 
                              type="email" 
                              value={editData.email} 
                              onChange={handleChange}
                              className="table-input"
                            />
                          ) : u.email}
                        </td>
                        <td>
                          {editingId === u.id ? (
                            <input 
                              name="mobile_no" 
                              value={editData.mobile_no} 
                              onChange={handleChange}
                              className="table-input"
                            />
                          ) : u.mobile_no}
                        </td>
                        <td>
                          {editingId === u.id ? (
                            <input 
                              name="roll_no" 
                              value={editData.roll_no} 
                              onChange={handleChange}
                              className="table-input"
                            />
                          ) : u.roll_no}
                        </td>
                        <td>
                          {editingId === u.id ? (
                            <input 
                              name="course" 
                              value={editData.course} 
                              onChange={handleChange}
                              className="table-input"
                            />
                          ) : u.course}
                        </td>
                        <td>
                          {editingId === u.id ? (
                            <input 
                              name="semester" 
                              value={editData.semester} 
                              onChange={handleChange}
                              className="table-input"
                            />
                          ) : u.semester}
                        </td>
                        <td>
                          {editingId === u.id ? (
                            <input 
                              name="feeDue" 
                              type="number" 
                              value={editData.feeDue} 
                              onChange={handleChange}
                              className="table-input"
                            />
                          ) : (
                            <span className={`fee-amount ${u.feeDue > 0 ? 'pending' : 'paid'}`}>
                              ₹{u.feeDue || 0}
                            </span>
                          )}
                        </td>
                        <td>
                          {editingId === u.id ? (
                            <input
                              name="dueDate"
                              type="date"
                              value={editData.dueDate}
                              onChange={handleChange}
                              className="table-input"
                            />
                          ) : (
                            u.dueDate ? new Date(u.dueDate).toLocaleDateString() : 'Not set'
                          )}
                        </td>
                        <td>
                          <div className="action-buttons">
                            {editingId === u.id ? (
                              <>
                                <button 
                                  className="btn-save"
                                  onClick={() => handleUpdate(u.id)}
                                >
                                  <i className="bi bi-check"></i>
                                </button>
                                <button 
                                  className="btn-cancel"
                                  onClick={() => setEditingId(null)}
                                >
                                  <i className="bi bi-x"></i>
                                </button>
                              </>
                            ) : (
                              <button 
                                className="btn-edit"
                                onClick={() => handleEdit(u)}
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminDashboard;