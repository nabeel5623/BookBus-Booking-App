import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaBars, 
  FaUser, 
  FaCog, 
  FaBell, 
  FaSignOutAlt,
  FaUserCircle,
  FaHistory
} from 'react-icons/fa';
import './Navbar.css';

function Navbar({ toggleSidebar }) {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const navigate = useNavigate();

  const handleSettingsClick = () => {
    navigate('/settings');  // Navigate to settings page
  };

  const handleAccountClick = () => {
    navigate('/account');
  };

  const handleNotificationClick = () => {
    navigate('/notifications');
  };

  return (
    <nav className="navbar" style={{ backgroundColor: '#111111' }}>
      <div className="nav-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <FaBars />
        </button>
        <h1>
          <div className="brand-name">
            Book<span>Bus</span>
          </div>
        </h1>
      </div>
      
      <div className="nav-right">
        <button 
          className="nav-button"
          onClick={handleNotificationClick}
        >
          <div className="notification-badge">
            <FaBell />
          </div>
          <span>Notifications</span>
        </button>

        <button 
          className="nav-button"
          onClick={handleSettingsClick}
        >
          <FaCog />
          <span>Settings</span>
        </button>

        <div className="account-dropdown">
          <button 
            className="nav-button"
            onClick={handleAccountClick}
          >
            <FaUser />
            <span>Account</span>
          </button>

          {showAccountMenu && (
            <div className="dropdown-menu">
              <a href="#profile">
                <FaUserCircle />
                My Profile
              </a>
              <a href="#bookings">
                <FaHistory />
                Booking History
              </a>
              <div className="dropdown-divider" />
              <a href="#logout" className="logout-link">
                <FaSignOutAlt />
                Sign Out
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
