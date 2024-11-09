import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaMoon, 
  FaSun, 
  FaBell, 
  FaLock, 
  FaLanguage,
  FaQuestionCircle,
  FaSignOutAlt,
  FaArrowLeft
} from 'react-icons/fa';
import LogoutAnimation from '../LogoutAnimation/LogoutAnimation';
import './Settings.css';
import { useTheme } from '../../context/ThemeContext';

const LogoutConfirmModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Confirm Logout</h3>
        <p>Are you sure you want to logout?</p>
        <div className="modal-buttons">
          <button onClick={onCancel} className="cancel-btn">Cancel</button>
          <button onClick={onConfirm} className="confirm-btn">Logout</button>
        </div>
      </div>
    </div>
  );
};

function Settings() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggingOut(true);
    
    // Simulate logout process
    setTimeout(() => {
      // Add any logout logic here (clear tokens, etc.)
      navigate('/login');
    }, 2000); // Show animation for 2 seconds
  };

  return (
    <>
      {isLoggingOut && <LogoutAnimation />}
      <div className={`settings-page ${isDarkMode ? 'dark' : 'light'}`}>
        <div className="settings-container">
          <div className="settings-header">
            
            <h1>Settings</h1>
          </div>

          <div className="settings-sections">
            {/* Appearance Section */}
            <section className="settings-section">
              <h2>Appearance</h2>
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon">
                    {isDarkMode ? <FaMoon /> : <FaSun />}
                  </div>
                  <div className="setting-text">
                    <h3>Dark Mode</h3>
                    <p>Toggle dark/light theme</p>
                  </div>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={toggleTheme}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </section>

            {/* Notifications Section */}
            <section className="settings-section">
              <h2>Notifications</h2>
              <div className="setting-item">
                <div className="setting-info">
                  <div className="setting-icon">
                    <FaBell />
                  </div>
                  <div className="setting-text">
                    <h3>Push Notifications</h3>
                    <p>Get notified about updates</p>
                  </div>
                </div>
                <label className="switch">
                  <input 
                    type="checkbox"
                    checked={notifications}
                    onChange={() => setNotifications(!notifications)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </section>

            {/* Other Settings */}
            <section className="settings-section">
              <h2>General</h2>
              <div className="setting-item clickable">
                <div className="setting-info">
                  <div className="setting-icon">
                    <FaLock />
                  </div>
                  <div className="setting-text">
                    <h3>Privacy & Security</h3>
                    <p>Manage your privacy settings</p>
                  </div>
                </div>
              </div>

              <div className="setting-item clickable">
                <div className="setting-info">
                  <div className="setting-icon">
                    <FaLanguage />
                  </div>
                  <div className="setting-text">
                    <h3>Language</h3>
                    <p>Change your language preference</p>
                  </div>
                </div>
              </div>

              <div className="setting-item clickable">
                <div className="setting-info">
                  <div className="setting-icon">
                    <FaQuestionCircle />
                  </div>
                  <div className="setting-text">
                    <h3>Help & Support</h3>
                    <p>Get help or contact support</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Logout Section */}
            <section className="settings-section">
              <div 
                className="setting-item clickable logout" 
                onClick={handleLogout}
                style={{ cursor: isLoggingOut ? 'default' : 'pointer' }}
              >
                <div className="setting-info">
                  <div className="setting-icon">
                    <FaSignOutAlt />
                  </div>
                  <div className="setting-text">
                    <h3>Logout</h3>
                    <p>Sign out of your account</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;
