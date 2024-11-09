import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaHotel, FaTaxi, FaUtensils, FaWifi, FaUmbrella, FaCoffee, FaBed, FaLuggageCart } from 'react-icons/fa';
import './BookingExtras.css';

const BookingExtras = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [mealChoice, setMealChoice] = useState('');
  const [hotelType, setHotelType] = useState('');
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      name: '',
      phone: '',
      gender: ''
    }
  ]);
  
  const totalAmount = location.state?.totalAmount;
  const selectedSeats = location.state?.selectedSeats;

  const travelExtras = [
    {
      id: 'hotel',
      icon: <FaHotel />,
      title: 'Hotel Booking',
      description: 'Book your stay at destination',
      options: [
        { label: 'Budget Hotel - ₹999/night', value: 999 },
        { label: 'Premium Hotel - ₹1999/night', value: 1999 },
        { label: 'Luxury Hotel - ₹3999/night', value: 3999 }
      ],
      type: 'hotel'
    },
    {
      id: 'taxi',
      icon: <FaTaxi />,
      title: 'Taxi Service',
      description: 'Pre-book your pickup',
      price: 499,
      type: 'single'
    },
    {
      id: 'meal',
      icon: <FaUtensils />,
      title: 'Meal Package',
      description: 'Pre-book your meals',
      options: [
        { label: 'Veg Meal - ₹150', value: 150 },
        { label: 'Non-Veg Meal - ₹180', value: 180 },
        { label: 'Jain Meal - ₹150', value: 150 }
      ],
      type: 'meal'
    },
    {
      id: 'wifi',
      icon: <FaWifi />,
      title: 'Onboard WiFi',
      description: 'High-speed internet access',
      price: 99,
      type: 'single'
    },
    {
      id: 'umbrella',
      icon: <FaUmbrella />,
      title: 'Weather Protection',
      description: 'Umbrella service at destination',
      price: 50,
      type: 'single'
    },
    {
      id: 'refreshment',
      icon: <FaCoffee />,
      title: 'Refreshments',
      description: 'Snacks and beverages',
      price: 120,
      type: 'single'
    },
    {
      id: 'comfort',
      icon: <FaBed />,
      title: 'Comfort Kit',
      description: 'Blanket, pillow & eye mask',
      price: 149,
      type: 'single'
    },
    {
      id: 'luggage',
      icon: <FaLuggageCart />,
      title: 'Luggage Service',
      description: 'Porter assistance at both ends',
      price: 199,
      type: 'single'
    }
  ];

  const handleExtraToggle = (extraId) => {
    setSelectedExtras(prev => 
      prev.includes(extraId) 
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const calculateExtrasTotal = () => {
    return selectedExtras.reduce((sum, extraId) => {
      const extra = travelExtras.find(e => e.id === extraId);
      if (extra.type === 'hotel' && hotelType) {
        return sum + parseInt(hotelType);
      } else if (extra.type === 'meal' && mealChoice) {
        return sum + parseInt(mealChoice);
      } else if (extra.type === 'single') {
        return sum + extra.price;
      }
      return sum;
    }, 0);
  };

  const finalTotal = totalAmount + calculateExtrasTotal();

  const handlePayment = () => {
    // Validate passenger details
    const isValid = passengers.every(p => p.name && p.phone && p.gender);
    if (!isValid) {
      alert('Please fill in all passenger details');
      return;
    }

    navigate('/booking-confirmation', {
      state: {
        totalAmount: finalTotal,
        selectedSeats,
        passengers,
        extrasSelected: selectedExtras
      }
    });
  };

  return (
    <div className="booking-extras-container">
      {/* Bus Fare Summary Section */}
      <div className="bus-fare-summary">
        <h3>Bus Fare Summary</h3>
        <div className="fare-details">
          <div className="fare-item">
            <span>Selected Seats</span>
            <span>{selectedSeats?.join(', ')}</span>
          </div>
          <div className="fare-item total">
            <span>Total</span>
            <span>₹{totalAmount}</span>
          </div>
        </div>
      </div>

      {/* Passenger Details Section */}
      <div className="passenger-details-section">
        <h2>Passenger Details</h2>
        <div className="passengers-container">
          {selectedSeats.map((seat, index) => (
            <div key={index} className="passenger-card">
              <div className="seat-number">Seat {seat}</div>
              <div className="passenger-form">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    placeholder="Enter passenger name"
                    value={passengers[index]?.name || ''}
                    onChange={(e) => {
                      const newPassengers = [...passengers];
                      if (!newPassengers[index]) {
                        newPassengers[index] = {};
                      }
                      newPassengers[index].name = e.target.value;
                      setPassengers(newPassengers);
                    }}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    value={passengers[index]?.phone || ''}
                    onChange={(e) => {
                      const newPassengers = [...passengers];
                      if (!newPassengers[index]) {
                        newPassengers[index] = {};
                      }
                      newPassengers[index].phone = e.target.value;
                      setPassengers(newPassengers);
                    }}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Gender</label>
                  <select
                    value={passengers[index]?.gender || ''}
                    onChange={(e) => {
                      const newPassengers = [...passengers];
                      if (!newPassengers[index]) {
                        newPassengers[index] = {};
                      }
                      newPassengers[index].gender = e.target.value;
                      setPassengers(newPassengers);
                    }}
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Extras Section */}
      <div className="extras-section">
        <h3>Enhance Your Journey</h3>
        <div className="extras-grid">
          {travelExtras.map(extra => (
            <div 
              key={extra.id}
              className={`extra-item ${selectedExtras.includes(extra.id) ? 'selected' : ''}`}
            >
              <div className="extra-icon">{extra.icon}</div>
              <div className="extra-details">
                <h4>{extra.title}</h4>
                <p>{extra.description}</p>
                
                {extra.type === 'hotel' && (
                  <select 
                    value={hotelType}
                    onChange={(e) => setHotelType(e.target.value)}
                    className="extra-select"
                  >
                    <option value="">Select Hotel Type</option>
                    {extra.options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {extra.type === 'meal' && (
                  <select 
                    value={mealChoice}
                    onChange={(e) => setMealChoice(e.target.value)}
                    className="extra-select"
                  >
                    <option value="">Select Meal Type</option>
                    {extra.options.map(opt => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {extra.type === 'single' && (
                  <span className="extra-price">₹{extra.price}</span>
                )}

                <button 
                  className={`add-button ${selectedExtras.includes(extra.id) ? 'added' : ''}`}
                  onClick={() => handleExtraToggle(extra.id)}
                >
                  {selectedExtras.includes(extra.id) ? 'Remove' : 'Add'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Final Total Section */}
      <div className="final-total">
        <div className="total-breakdown">
          <div className="breakdown-item">
            <span>Bus Fee</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="breakdown-item">
            <span>Add-ons</span>
            <span>₹{calculateExtrasTotal()}</span>
          </div>
          <div className="breakdown-total">
            <span>Final Total</span>
            <span>₹{finalTotal}</span>
          </div>
        </div>
        <button className="proceed-button" onClick={handlePayment}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default BookingExtras;
