import React from 'react';
import './LogoutAnimation.css';
import { FaSignOutAlt } from 'react-icons/fa';

function LogoutAnimation() {
  return (
    <div className="logout-animation-container">
      <div className="logout-content">
        <div className="logout-icon">
          <FaSignOutAlt />
        </div>
        <div className="logout-text">
          <h2>Logging Out</h2>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogoutAnimation;
