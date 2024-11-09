import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaBus, FaStar, FaHeart, FaTicketAlt, FaMapMarkerAlt, FaCalendarAlt, FaUserAlt } from 'react-icons/fa';
import './BookingConfirmation.css';

const BookingConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    totalAmount = '2500', 
    selectedSeats = ['A1', 'A2'],
    extrasSelected = ['Meal Package', 'WiFi'],
    journeyDate = new Date().toLocaleDateString(),
    from = 'HYDERABAD',
    to = 'BANGALORE'
  } = location.state || {};

  const ticketId = `BL${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="success-animation">
          <FaCheckCircle className="check-icon" />
          <div className="floating-elements">
            <FaBus className="floating-icon bus" />
            <FaStar className="floating-icon star-1" />
            <FaStar className="floating-icon star-2" />
            <FaHeart className="floating-icon heart" />
            <FaStar className="floating-icon star-3" />
          </div>
        </div>
        
        <h1 className="confirmation-title">
          Congratulations!
        </h1>
        
        <div className="message-container">
          <p className="confirmation-message">Your journey is confirmed</p>
          <p className="journey-message">SAFE JOURNEY</p>
        </div>

        {/* Digital Ticket Section */}
        <div className="digital-ticket">
          <div className="ticket-header">
            <FaTicketAlt className="ticket-icon" />
            <h2>Digital Ticket</h2>
          </div>
          
          <div className="ticket-body">
            <div className="ticket-row">
              <div className="ticket-detail">
                <span className="detail-label">
                  <FaMapMarkerAlt /> From
                </span>
                <span className="detail-value">{from}</span>
              </div>
              <div className="ticket-detail">
                <span className="detail-label">
                  <FaMapMarkerAlt /> To
                </span>
                <span className="detail-value">{to}</span>
              </div>
            </div>

            <div className="ticket-row">
              <div className="ticket-detail">
                <span className="detail-label">
                  <FaCalendarAlt /> Journey Date
                </span>
                <span className="detail-value">{journeyDate}</span>
              </div>
              <div className="ticket-detail">
                <span className="detail-label">
                  <FaUserAlt /> Seat(s)
                </span>
                <span className="detail-value">{selectedSeats.join(', ')}</span>
              </div>
            </div>

            <div className="ticket-extras">
              <h3>Added Extras</h3>
              <div className="extras-list">
                {extrasSelected.map((extra, index) => (
                  <span key={index} className="extra-tag">{extra}</span>
                ))}
              </div>
            </div>

            <div className="ticket-section">
              <h3>Passenger Details</h3>
              {location.state?.passengers.map((passenger, index) => (
                <div key={index} className="passenger-info">
                  <div className="seat-detail">Seat {location.state.selectedSeats[index]}</div>
                  <div className="passenger-detail">
                    <p><strong>Name:</strong> {passenger.name}</p>
                    <p><strong>Phone:</strong> {passenger.phone}</p>
                    <p><strong>Gender:</strong> {passenger.gender}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="ticket-footer">
              <div className="ticket-price">
                <span>Total Paid</span>
                <span className="price">₹{totalAmount}</span>
              </div>
              <div className="ticket-id">
                Booking ID: {ticketId}
              </div>
            </div>
          </div>
        </div>

        <div className="ticket-actions">
          <button className="action-button download">
            Download Ticket
          </button>
          <button 
            className="action-button share"
            onClick={() => navigate('/')}
          >
            Back to Home
          </button>
        </div>

        <div className="confetti-container">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`confetti confetti-${i}`}></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
