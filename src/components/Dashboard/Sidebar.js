import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaTicketAlt, 
  FaHistory, 
  FaHeart, 
  FaWallet, 
  FaHeadset,
  FaCog,
  FaSignOutAlt
} from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ isOpen, onSidebarToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { 
      id: 1,
      path: '/dashboard', 
      icon: <FaHome />, 
      label: 'Dashboard'
    },
    { 
      id: 2,
      path: '/bookings', 
      icon: <FaTicketAlt />, 
      label: 'My Bookings'
    },
    { 
      id: 3,
      path: '/history', 
      icon: <FaHistory />, 
      label: 'History'
    },
    { 
      id: 4,
      path: '/favorites', 
      icon: <FaHeart />, 
      label: 'Favorites'
    },
    { 
      id: 5,
      path: '/wallet', 
      icon: <FaWallet />, 
      label: 'Wallet'
    },
    { 
      id: 6,
      path: '/support', 
      icon: <FaHeadset />, 
      label: 'Support'
    },
    { 
      id: 7,
      path: '/settings', 
      icon: <FaCog />, 
      label: 'Settings'
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth <= 768) {
      onSidebarToggle();
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-menu">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => handleNavigation(item.path)}
          >
            <div className="menu-icon">{item.icon}</div>
            <span className="menu-label">{item.label}</span>
            {item.path === '/bookings' && (
              <span className="menu-badge">2</span>
            )}
          </div>
        ))}
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">JD</div>
          <div className="user-details">
            <span className="user-name">John Doe</span>
            <span className="user-email">john@example.com</span>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
