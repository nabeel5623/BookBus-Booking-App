import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaPhone, FaHistory, FaSignOutAlt } from 'react-icons/fa';
import './Account.css';

function Account() {
  const navigate = useNavigate();

  // Example user data (replace with actual user data from your state management)
  const user = {
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    recentBookings: [
      {
        id: 1,
        from: "Bangalore",
        to: "Chennai",
        date: "2024-03-15",
        status: "Confirmed"
      },
      {
        id: 2,
        from: "Chennai",
        to: "Bangalore",
        date: "2024-03-20",
        status: "Pending"
      }
    ]
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h2>My Account</h2>
        </div>

        <div className="profile-section">
          <div className="profile-avatar">
            <FaUser />
          </div>
          <div className="profile-info">
            <div className="info-item">
              <FaUser className="info-icon" />
              <div>
                <label>Name</label>
                <p>{user.name}</p>
              </div>
            </div>
            <div className="info-item">
              <FaEnvelope className="info-icon" />
              <div>
                <label>Email</label>
                <p>{user.email}</p>
              </div>
            </div>
            <div className="info-item">
              <FaPhone className="info-icon" />
              <div>
                <label>Phone</label>
                <p>{user.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="recent-bookings">
          <h3>Recent Bookings</h3>
          <div className="bookings-list">
            {user.recentBookings.map(booking => (
              <div key={booking.id} className="booking-card">
                <div className="booking-details">
                  <div className="route">
                    <span>{booking.from}</span>
                    <span className="arrow">→</span>
                    <span>{booking.to}</span>
                  </div>
                  <div className="booking-info">
                    <span className="date">{new Date(booking.date).toLocaleDateString()}</span>
                    <span className={`status ${booking.status.toLowerCase()}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="logout-button" onClick={handleLogout}>
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}

export default Account;
