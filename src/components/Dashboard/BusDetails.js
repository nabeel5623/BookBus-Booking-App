import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaBus, FaPhone, FaUser, FaMapMarkerAlt, FaBed } from 'react-icons/fa';
import './BusDetails.css';

function BusDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [maleSeats, setMaleSeats] = useState(0);
  const [femaleSeats, setFemaleSeats] = useState(0);
  const seatPrice = 750; // Or whatever your seat price is
  
  // Default bus data with prices
  const defaultBusData = {
    id: 1,
    name: "Royal Travels",
    type: "AC Sleeper",
    departureTime: "21:00",
    arrivalTime: "06:00",
    duration: "9h",
    rating: 4.5,
    prices: {
      lower: 899,
      upper: 1299,
      general: 2100
    },
    driver: {
      name: "Rajesh Kumar",
      phone: "+91 9876543210",
      experience: "8 years",
      rating: 4.7
    }
  };

  // Initialize bus data with default values
  const [busData, setBusData] = useState(defaultBusData);

  useEffect(() => {
    if (location.state?.busData) {
      setBusData({
        ...location.state.busData,
        prices: location.state.busData.prices || defaultBusData.prices
      });
    }
  }, [location.state]);

  const handleSeatClick = (seatNo) => {
    setSelectedSeats(prev => {
      if (prev.includes(seatNo)) {
        return prev.filter(seat => seat !== seatNo);
      } else {
        return [...prev, seatNo];
      }
    });
  };

  const getSeatCategory = (seatNo) => {
    const seatNumber = parseInt(seatNo.slice(1));
    if (seatNumber <= 5) return 'male';
    if (seatNumber <= 8) return 'female';
    return 'general';
  };

  const getSeatPrice = (seatNo) => {
    if (seatNo.startsWith('U')) {
      return `₹${busData.prices.upper}`;
    } else if (getSeatCategory(seatNo) === 'general') {
      return `₹${busData.prices.general}`;
    }
    return `₹${busData.prices.lower}`;
  };

  const calculateBaseFare = () => {
    return selectedSeats.reduce((total, seatNo) => {
      const price = parseInt(getSeatPrice(seatNo).replace('₹', ''));
      return total + price;
    }, 0);
  };

  const calculateGST = () => {
    const baseFare = calculateBaseFare();
    return {
      cgst: Math.round(baseFare * 0.025), // 2.5% CGST
      sgst: Math.round(baseFare * 0.025)  // 2.5% SGST
    };
  };

  const calculateConvenienceFee = () => {
    return selectedSeats.length * 20; // ₹20 per seat
  };

  const calculateTotal = () => {
    const baseFare = calculateBaseFare();
    const { cgst, sgst } = calculateGST();
    const convenienceFee = calculateConvenienceFee();
    return baseFare + cgst + sgst + convenienceFee;
  };

  const handlePayment = () => {
    if(selectedSeats.length > 0) {
      navigate('/booking-extras', { 
        state: { 
          totalAmount: calculateTotal(),  // Pass the total amount
          selectedSeats: selectedSeats,   // Optionally pass selected seats
        } 
      });
    } else {
      alert('Please select at least one seat');
    }
  };

  const handleSeatSelect = (seatNumber, gender) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter(seat => seat !== seatNumber));
      if (gender === 'male') {
        setMaleSeats(maleSeats - 1);
      } else if (gender === 'female') {
        setFemaleSeats(femaleSeats - 1);
      }
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);
      if (gender === 'male') {
        setMaleSeats(maleSeats + 1);
      } else if (gender === 'female') {
        setFemaleSeats(femaleSeats + 1);
      }
    }

    // Show payment modal when seats are selected
    if (selectedSeats.length > 0) {
      setShowPaymentModal(true);
    } else {
      setShowPaymentModal(false);
    }
  };

  return (
    <div className="bus-details-page">
      <div className="brand-header">
        <div className="brand-content">
          <div className="brand-name">
            Book<span>Bus</span>
          </div>
        </div>
      </div>

      <div className="bus-details-content">
        {/* Bus Info Section */}
        <div className="bus-info-section">
          <h1>{busData.name}</h1>
          <div className="bus-type-rating">
            <span className="bus-type">{busData.type}</span>
            <div className="rating">
              <FaStar /> {busData.rating}
            </div>
          </div>
        </div>

        {/* Seating Structure Section */}
        <div className="seating-structure-section">
          <h2>Select Your Seats</h2>
          
          <div className="deck-container">
            {/* Upper Deck */}
            <div className="deck upper-deck">
              <h3>Upper Deck</h3>
              <div className="seat-layout">
                <div className="seat-column">
                  {['U1', 'U3', 'U5', 'U7', 'U9'].map(seatNo => (
                    <div 
                      key={seatNo}
                      className={`seat ${selectedSeats.includes(seatNo) ? 'selected' : ''} ${getSeatCategory(seatNo)}`}
                      onClick={() => handleSeatClick(seatNo)}
                      data-price={getSeatPrice(seatNo)}
                    >
                      <FaBed className="seat-icon" />
                      <span className="seat-label">{seatNo}</span>
                    </div>
                  ))}
                </div>
                <div className="seat-column">
                  {['U2', 'U4', 'U6', 'U8', 'U10'].map(seatNo => (
                    <div 
                      key={seatNo}
                      className={`seat ${selectedSeats.includes(seatNo) ? 'selected' : ''} ${getSeatCategory(seatNo)}`}
                      onClick={() => handleSeatClick(seatNo)}
                      data-price={getSeatPrice(seatNo)}
                    >
                      <FaBed className="seat-icon" />
                      <span className="seat-label">{seatNo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Lower Deck */}
            <div className="deck lower-deck">
              <h3>Lower Deck</h3>
              <div className="seat-layout">
                <div className="seat-column">
                  {['L1', 'L3', 'L5', 'L7', 'L9'].map(seatNo => (
                    <div 
                      key={seatNo}
                      className={`seat ${selectedSeats.includes(seatNo) ? 'selected' : ''} ${getSeatCategory(seatNo)}`}
                      onClick={() => handleSeatClick(seatNo)}
                      data-price={getSeatPrice(seatNo)}
                    >
                      <FaBed className="seat-icon" />
                      <span className="seat-label">{seatNo}</span>
                    </div>
                  ))}
                </div>
                <div className="seat-column">
                  {['L2', 'L4', 'L6', 'L8', 'L10'].map(seatNo => (
                    <div 
                      key={seatNo}
                      className={`seat ${selectedSeats.includes(seatNo) ? 'selected' : ''} ${getSeatCategory(seatNo)}`}
                      onClick={() => handleSeatClick(seatNo)}
                      data-price={getSeatPrice(seatNo)}
                    >
                      <FaBed className="seat-icon" />
                      <span className="seat-label">{seatNo}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Section - Moved below deck container */}
          <div className="pricing-section">
            <h3>Seat Categories & Pricing</h3>
            <div className="seat-prices-info">
              <div className="price-category male">
                <span className="dot"></span>
                <span>Male (50%) - Lower: ₹{busData.prices.lower}</span>
              </div>
              <div className="price-category female">
                <span className="dot"></span>
                <span>Female (30%) - Upper: ₹{busData.prices.upper}</span>
              </div>
              <div className="price-category general">
                <span className="dot"></span>
                <span>General (20%) - Premium: ₹{busData.prices.general}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Driver Info Section */}
        <div className="driver-info-section">
          <h2>Driver Details</h2>
          <div className="driver-details">
            <div className="driver-name">
              <FaUser />
              <span>{busData.driver.name}</span>
            </div>
            <div className="driver-rating">
              <FaStar /> {busData.driver.rating}
            </div>
            <div className="driver-contact">
              <FaPhone />
              <span>{busData.driver.phone}</span>
            </div>
            <div className="driver-experience">
              Experience: {busData.driver.experience}
            </div>
          </div>
        </div>
      </div>

      {/* Booking Summary Section */}
      <div className={`booking-summary ${selectedSeats.length > 0 ? 'active' : ''}`}>
        <div className="selected-seats-info">
          <h3>Selected Seats</h3>
          <div className="category-legend">
            <div className="legend-item male">
              <span className="legend-dot"></span>
              <span>Male Reserved (50%)</span>
            </div>
            <div className="legend-item female">
              <span className="legend-dot"></span>
              <span>Female Reserved (30%)</span>
            </div>
            <div className="legend-item general">
              <span className="legend-dot"></span>
              <span>General (20%)</span>
            </div>
          </div>
          
          {selectedSeats.length > 0 ? (
            <div className="selected-seats-list">
              {selectedSeats.map(seatNo => (
                <div key={seatNo} className={`seat-card ${getSeatCategory(seatNo)}`}>
                  <div className="seat-card-header">
                    <span className="seat-number">Seat {seatNo}</span>
                    <button 
                      className="remove-seat"
                      onClick={() => handleSeatClick(seatNo)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="seat-details">
                    <div className="seat-info">
                      <span className="deck-type">
                        {seatNo.startsWith('U') ? 'Upper Deck' : 'Lower Deck'}
                      </span>
                      <span className="category-type">
                        {getSeatCategory(seatNo)} Section
                      </span>
                    </div>
                    <div className="seat-price">
                      {getSeatPrice(seatNo)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-seats-message">
              <FaBed className="empty-icon" />
              <p>No seats selected</p>
              <span>Please select seats from the layout above</span>
            </div>
          )}
        </div>

        {selectedSeats.length > 0 && (
          <div className="booking-details">
            <div className="price-breakdown">
              <div className="breakdown-item">
                <span>Base Fare ({selectedSeats.length} seats)</span>
                <span>₹{calculateBaseFare()}</span>
              </div>
              <div className="breakdown-item">
                <span>CGST (2.5%)</span>
                <span>₹{calculateGST().cgst}</span>
              </div>
              <div className="breakdown-item">
                <span>SGST (2.5%)</span>
                <span>₹{calculateGST().sgst}</span>
              </div>
              <div className="breakdown-item">
                <span>Convenience Fee</span>
                <span>₹{calculateConvenienceFee()}</span>
              </div>
              <div className="breakdown-total">
                <span>Total Amount</span>
                <span>₹{calculateTotal()}</span>
              </div>
            </div>
            
            <div className="action-buttons">
              <button 
                className="pay-button" 
                onClick={handlePayment}
              >
                Proceed to Extras
              </button>
            </div>
          </div>
        )}
      </div>

      {showPaymentModal && (
        <div className="payment-modal-overlay">
          <div className="payment-modal">
            <div className="modal-header">
              <h3>Booking Summary</h3>
              <button 
                className="close-button"
                onClick={() => setShowPaymentModal(false)}
              >
                ×
              </button>
            </div>

            <div className="seat-summary">
              <div className="summary-row">
                <span>Selected Seats</span>
                <span>{selectedSeats.join(', ')}</span>
              </div>
              <div className="summary-row">
                <span>Seat Type</span>
                <div className="seat-types">
                  <span className="seat-type male">Male: {maleSeats}</span>
                  <span className="seat-type female">Female: {femaleSeats}</span>
                </div>
              </div>
              <div className="summary-row total">
                <span>Total Amount</span>
                <span>₹{selectedSeats.length * seatPrice}</span>
              </div>
            </div>

            <button 
              className="proceed-button"
              onClick={() => navigate('/booking-extras')}
            >
              Proceed to Extras
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BusDetails;
