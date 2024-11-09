import React, { useState } from 'react';
import { 
  FaUtensils, 
  FaBed, 
  FaTaxi, 
  FaUmbrella, 
  FaWifi,
  FaLuggageCart,
  FaCoffee,
  FaHotel,
  FaRobot
} from 'react-icons/fa';
import './BookingEnhancements.css';

const BookingEnhancements = () => {
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [aiRecommendations, setAiRecommendations] = useState({
    weather: "Rainy weather expected. Consider adding umbrella service.",
    traffic: "High traffic expected at destination. Cab pre-booking recommended.",
    food: "2-hour delay expected on route. Meal recommended."
  });

  const addOns = [
    {
      id: 'meal',
      icon: <FaUtensils />,
      title: 'Meal Package',
      description: 'Pre-book your meals (Veg/Non-veg)',
      price: 150,
      options: ['Veg Thali', 'Non-veg Thali', 'Jain Meal']
    },
    {
      id: 'blanket',
      icon: <FaBed />,
      title: 'Comfort Kit',
      description: 'Blanket, pillow & eye mask',
      price: 100,
    },
    {
      id: 'cab',
      icon: <FaTaxi />,
      title: 'Destination Cab',
      description: 'Pre-book your pickup',
      price: 299,
    },
    {
      id: 'umbrella',
      icon: <FaUmbrella />,
      title: 'Weather Protection',
      description: 'Umbrella service at destination',
      price: 50,
    },
    {
      id: 'wifi',
      icon: <FaWifi />,
      title: 'Onboard WiFi',
      description: 'High-speed internet access',
      price: 80,
    },
    {
      id: 'luggage',
      icon: <FaLuggageCart />,
      title: 'Luggage Assistance',
      description: 'Porter service at both ends',
      price: 120,
    }
  ];

  const handleAddOnToggle = (addOnId) => {
    setSelectedAddOns(prev => 
      prev.includes(addOnId) 
        ? prev.filter(id => id !== addOnId)
        : [...prev, addOnId]
    );
  };

  return (
    <div className="enhancements-container">
      <div className="ai-recommendations">
        <div className="section-header">
          <FaRobot className="ai-icon" />
          <h2>AI Travel Assistant Recommendations</h2>
        </div>
        <div className="recommendations-grid">
          {Object.entries(aiRecommendations).map(([key, value]) => (
            <div key={key} className="recommendation-card">
              <p>{value}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="add-ons-section">
        <div className="section-header">
          <h2>Enhance Your Journey</h2>
          <p>Personalize your travel experience</p>
        </div>
        
        <div className="add-ons-grid">
          {addOns.map(addOn => (
            <div 
              key={addOn.id} 
              className={`add-on-card ${selectedAddOns.includes(addOn.id) ? 'selected' : ''}`}
              onClick={() => handleAddOnToggle(addOn.id)}
            >
              <div className="add-on-icon">{addOn.icon}</div>
              <div className="add-on-details">
                <h3>{addOn.title}</h3>
                <p>{addOn.description}</p>
                <span className="price">₹{addOn.price}</span>
              </div>
              {addOn.options && (
                <select className="add-on-options">
                  <option value="">Select Option</option>
                  {addOn.options.map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="booking-summary">
        <div className="summary-content">
          <h3>Booking Summary</h3>
          <div className="summary-items">
            {selectedAddOns.map(id => {
              const addOn = addOns.find(a => a.id === id);
              return (
                <div key={id} className="summary-item">
                  <span>{addOn.title}</span>
                  <span>₹{addOn.price}</span>
                </div>
              );
            })}
          </div>
          <div className="total">
            <span>Total Add-ons</span>
            <span>₹{selectedAddOns.reduce((sum, id) => 
              sum + addOns.find(a => a.id === id).price, 0
            )}</span>
          </div>
        </div>
        <button className="proceed-btn">Proceed to Payment</button>
      </div>
    </div>
  );
};

export default BookingEnhancements;
