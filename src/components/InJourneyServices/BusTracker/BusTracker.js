import React, { useState, useEffect } from 'react';
import { FaBus, FaMapMarkerAlt, FaClock, FaRoute } from 'react-icons/fa';
import './BusTracker.css';

const BusTracker = ({ ticketNumber }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [busData, setBusData] = useState(null);

  // Simulate loading and data fetching
  useEffect(() => {
    setTimeout(() => {
      setBusData({
        busName: "BookBus Express",
        routeNumber: "BB-2024",
        currentLocation: "Bangalore Electronic City",
        destination: "Chennai Central",
        estimatedTime: "2 hours 30 minutes",
        nextStop: "Hosur",
        speed: "65 km/h",
        lastUpdated: "2 minutes ago",
        completedDistance: 70, // percentage
        stops: [
          { name: "Bangalore", time: "10:00 AM", passed: true },
          { name: "Electronic City", time: "10:45 AM", passed: true },
          { name: "Hosur", time: "11:30 AM", passed: false },
          { name: "Krishnagiri", time: "12:15 PM", passed: false },
          { name: "Vellore", time: "02:00 PM", passed: false },
          { name: "Chennai", time: "04:30 PM", passed: false }
        ]
      });
      setIsLoading(false);
    }, 2000);
  }, []);

  if (isLoading) {
    return (
      <div className="tracker-loading">
        <div className="tracker-loader">
          <div className="bus-animation">🚌</div>
        </div>
        <p>Locating your bus...</p>
      </div>
    );
  }

  return (
    <div className="bus-tracker">
      <div className="tracker-header">
        <div className="bus-info">
          <h3>{busData.busName}</h3>
          <span className="route-number">{busData.routeNumber}</span>
        </div>
        <div className="ticket-info">
          <span>Ticket: {ticketNumber}</span>
          <span className="update-time">Updated {busData.lastUpdated}</span>
        </div>
      </div>

      <div className="tracking-map">
        <div className="route-progress">
          <div 
            className="progress-bar" 
            style={{ width: `${busData.completedDistance}%` }}
          />
          <div 
            className="bus-marker"
            style={{ left: `${busData.completedDistance}%` }}
          >
            <FaBus />
          </div>
        </div>

        <div className="route-points">
          <div className="start-point">
            <FaMapMarkerAlt />
            <span>Bangalore</span>
          </div>
          <div className="end-point">
            <FaMapMarkerAlt />
            <span>Chennai</span>
          </div>
        </div>
      </div>

      <div className="tracking-details">
        <div className="detail-card current-location">
          <FaMapMarkerAlt />
          <div>
            <h4>Current Location</h4>
            <p>{busData.currentLocation}</p>
          </div>
        </div>

        <div className="detail-card eta">
          <FaClock />
          <div>
            <h4>Estimated Time</h4>
            <p>{busData.estimatedTime}</p>
          </div>
        </div>

        <div className="detail-card next-stop">
          <FaRoute />
          <div>
            <h4>Next Stop</h4>
            <p>{busData.nextStop}</p>
          </div>
        </div>
      </div>

      <div className="route-timeline">
        <h4>Journey Timeline</h4>
        <div className="timeline">
          {busData.stops.map((stop, index) => (
            <div 
              key={index} 
              className={`timeline-stop ${stop.passed ? 'passed' : ''}`}
            >
              <div className="stop-marker"></div>
              <div className="stop-info">
                <span className="stop-name">{stop.name}</span>
                <span className="stop-time">{stop.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BusTracker;
