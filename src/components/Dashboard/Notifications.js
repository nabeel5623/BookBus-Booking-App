import React, { useState } from 'react';
import { 
  FaBell, FaArrowLeft, FaCheck, FaClock, FaExclamationCircle, 
  FaTicketAlt, FaPercent, FaBus, FaRoute, FaInfoCircle, FaMoneyBillWave 
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './Notifications.css';

const Notifications = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

  // Generate random notifications
  const generateNotifications = () => {
    const notificationTypes = [
      {
        type: 'booking',
        icon: <FaTicketAlt />,
        title: 'Booking Confirmed',
        messages: [
          'Your booking #BK12345 for Mumbai to Pune has been confirmed. Journey date: 25th March 2024.',
          'Booking #BK67890 for Delhi to Jaipur is confirmed. Journey date: 28th March 2024.',
          'Your booking #BK34567 for Bangalore to Chennai is confirmed. Journey date: 30th March 2024.'
        ]
      },
      {
        type: 'offer',
        icon: <FaPercent />,
        title: 'Special Offer',
        messages: [
          'Get 20% off on your next booking! Use code MARCH20 at checkout.',
          'Weekend Special: 25% discount on all AC buses. Code: WEEKEND25',
          'First-time user? Get ₹100 off with code FIRST100',
          'Refer a friend and get ₹200 off on your next journey!'
        ]
      },
      {
        type: 'schedule',
        icon: <FaClock />,
        title: 'Schedule Update',
        messages: [
          'Bus timing updated for your upcoming journey.',
          'Slight delay expected due to traffic conditions.',
          'Route optimization: Your journey time has been reduced by 30 minutes.'
        ]
      },
      {
        type: 'alert',
        icon: <FaExclamationCircle />,
        title: 'Important Alert',
        messages: [
          'Weather alert: Heavy rainfall expected on your route.',
          'Route diversion due to road maintenance.',
          'Important: Bus departure time changed to 9:30 PM.'
        ]
      },
      {
        type: 'service',
        icon: <FaBus />,
        title: 'Service Update',
        messages: [
          'New premium buses added to your favorite route!',
          'Enhanced cleaning protocols implemented for your safety.',
          'Now enjoy free WiFi on all AC buses!'
        ]
      },
      {
        type: 'route',
        icon: <FaRoute />,
        title: 'Route Update',
        messages: [
          'New express service launched on your frequent route.',
          'Additional stops added for your convenience.',
          'Route modification: Now via express highway for faster travel.'
        ]
      },
      {
        type: 'payment',
        icon: <FaMoneyBillWave />,
        title: 'Payment Update',
        messages: [
          'Payment of ₹1,500 successfully processed.',
          'Refund of ₹800 initiated for cancelled booking.',
          'Your wallet has been credited with ₹200 cashback.'
        ]
      }
    ];

    // Generate today's notifications
    const todayNotifications = Array.from({ length: 8 }, () => {
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      return {
        id: Math.random().toString(36).substr(2, 9),
        ...type,
        message: type.messages[Math.floor(Math.random() * type.messages.length)],
        time: `${Math.floor(Math.random() * 12) + 1} hours ago`,
        unread: Math.random() > 0.3,
        important: Math.random() > 0.7
      };
    });

    // Generate yesterday's notifications
    const yesterdayNotifications = Array.from({ length: 6 }, () => {
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      return {
        id: Math.random().toString(36).substr(2, 9),
        ...type,
        message: type.messages[Math.floor(Math.random() * type.messages.length)],
        time: 'Yesterday',
        unread: Math.random() > 0.7,
        important: Math.random() > 0.8
      };
    });

    // Generate older notifications
    const olderNotifications = Array.from({ length: 10 }, () => {
      const type = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
      const days = Math.floor(Math.random() * 5) + 2;
      return {
        id: Math.random().toString(36).substr(2, 9),
        ...type,
        message: type.messages[Math.floor(Math.random() * type.messages.length)],
        time: `${days} days ago`,
        unread: false,
        important: Math.random() > 0.9
      };
    });

    return {
      today: todayNotifications,
      yesterday: yesterdayNotifications,
      older: olderNotifications
    };
  };

  const notifications = generateNotifications();

  const filterNotifications = (section) => {
    if (activeFilter === 'unread') {
      return section.filter(n => n.unread);
    }
    if (activeFilter === 'important') {
      return section.filter(n => n.important);
    }
    return section;
  };

  return (
    <div className="notifications-page">
      <div className="notifications-header">
        <div className="header-content">
          
          <h1>Notifications</h1>
          <div className="header-actions">
            <button className="mark-all-read">
              <FaCheck /> Mark all as read
            </button>
          </div>
        </div>
      </div>

      <div className="notifications-container">
        <div className="notifications-filter">
          <button 
            className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
          >
            All
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveFilter('unread')}
          >
            Unread
          </button>
          <button 
            className={`filter-btn ${activeFilter === 'important' ? 'active' : ''}`}
            onClick={() => setActiveFilter('important')}
          >
            Important
          </button>
        </div>

        {/* Today's Notifications */}
        <div className="notifications-section">
          <h2 className="section-title">Today</h2>
          {filterNotifications(notifications.today).map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.unread ? 'unread' : ''} ${notification.important ? 'important' : ''}`}
            >
              <div className={`notification-icon ${notification.type}`}>
                {notification.icon}
              </div>
              <div className="notification-content">
                <div className="notification-header">
                  <span className="notification-title">{notification.title}</span>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <p className="notification-message">{notification.message}</p>
                {notification.type === 'booking' && (
                  <div className="notification-actions">
                    <button className="action-btn">View Ticket</button>
                    <button className="action-btn secondary">Download</button>
                  </div>
                )}
                {notification.type === 'offer' && (
                  <div className="notification-actions">
                    <button className="action-btn">Apply Now</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Yesterday's Notifications */}
        <div className="notifications-section">
          <h2 className="section-title">Yesterday</h2>
          {filterNotifications(notifications.yesterday).map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.unread ? 'unread' : ''} ${notification.important ? 'important' : ''}`}
            >
              <div className={`notification-icon ${notification.type}`}>
                {notification.icon}
              </div>
              <div className="notification-content">
                <div className="notification-header">
                  <span className="notification-title">{notification.title}</span>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <p className="notification-message">{notification.message}</p>
                {notification.type === 'booking' && (
                  <div className="notification-actions">
                    <button className="action-btn">View Ticket</button>
                    <button className="action-btn secondary">Download</button>
                  </div>
                )}
                {notification.type === 'offer' && (
                  <div className="notification-actions">
                    <button className="action-btn">Apply Now</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Older Notifications */}
        <div className="notifications-section">
          <h2 className="section-title">Older</h2>
          {filterNotifications(notifications.older).map(notification => (
            <div 
              key={notification.id} 
              className={`notification-item ${notification.unread ? 'unread' : ''} ${notification.important ? 'important' : ''}`}
            >
              <div className={`notification-icon ${notification.type}`}>
                {notification.icon}
              </div>
              <div className="notification-content">
                <div className="notification-header">
                  <span className="notification-title">{notification.title}</span>
                  <span className="notification-time">{notification.time}</span>
                </div>
                <p className="notification-message">{notification.message}</p>
                {notification.type === 'booking' && (
                  <div className="notification-actions">
                    <button className="action-btn">View Ticket</button>
                    <button className="action-btn secondary">Download</button>
                  </div>
                )}
                {notification.type === 'offer' && (
                  <div className="notification-actions">
                    <button className="action-btn">Apply Now</button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
