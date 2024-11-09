import React, { useState } from 'react';
import { FaShoppingCart, FaUtensils, FaArrowLeft, FaPhone, FaExclamationCircle, FaHeadset, FaStar, FaCheck, FaTimes, FaTrash, FaArrowRight, FaPaperPlane, FaLocationArrow, FaBus, FaMapMarkerAlt, FaClock, FaRoute } from 'react-icons/fa';
import './ServicePages.css';

const ServicePages = ({ type, ticketNumber, onBack }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [complaintType, setComplaintType] = useState('');
  const [description, setDescription] = useState('');
  const [rating, setRating] = useState(0);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [isSubmittingComplaint, setIsSubmittingComplaint] = useState(false);
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [showEmergencyContact, setShowEmergencyContact] = useState(false);
  const [isRequestingAssistance, setIsRequestingAssistance] = useState(false);
  const [assistanceType, setAssistanceType] = useState('');
  const [assistanceRequested, setAssistanceRequested] = useState(false);
  const [isSubmittingFeedback, setIsSubmittingFeedback] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [showTracker, setShowTracker] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [busData, setBusData] = useState(null);

  // Food Menu Data
  const foodMenu = [
    {
      id: 1,
      name: "Veg Biryani",
      price: 180,
      description: "Fragrant rice with mixed vegetables and aromatic spices",
      category: "Main Course",
      image: "https://source.unsplash.com/featured/?biryani"
    },
    {
      id: 2,
      name: "Paneer Butter Masala",
      price: 220,
      description: "Cottage cheese in rich tomato gravy",
      category: "Main Course",
      image: "https://source.unsplash.com/featured/?curry"
    },
    {
      id: 3,
      name: "Dal Makhani",
      price: 160,
      description: "Creamy black lentils simmered overnight",
      category: "Main Course",
      image: "https://source.unsplash.com/featured/?dal"
    },
    {
      id: 4,
      name: "Butter Chicken",
      price: 250,
      description: "Classic creamy chicken curry",
      category: "Main Course",
      image: "https://source.unsplash.com/featured/?chicken"
    },
    {
      id: 5,
      name: "Mixed Veg Curry",
      price: 170,
      description: "Seasonal vegetables in spiced gravy",
      category: "Main Course",
      image: "https://source.unsplash.com/featured/?vegetable-curry"
    },
    {
      id: 6,
      name: "Masala Dosa",
      price: 120,
      description: "Crispy crepe with spiced potato filling",
      category: "Main Course",
      image: "https://source.unsplash.com/featured/?dosa"
    },
    {
      id: 7,
      name: "Hyderabadi Biryani",
      price: 260,
      description: "Aromatic rice with tender meat and spices",
      category: "Main Course",
      image: "https://source.unsplash.com/featured/?hyderabadi-biryani"
    },
    {
      id: 8,
      name: "Chettinad Chicken",
      price: 240,
      description: "Spicy South Indian style chicken curry",
      category: "Main Course",
      image: "https://source.unsplash.com/featured/?chicken-curry"
    },
    {
      id: 9,
      name: "Samosa (2 pcs)",
      price: 40,
      description: "Crispy pastry with spiced potato filling",
      category: "Snacks",
      image: "https://source.unsplash.com/featured/?samosa"
    },
    {
      id: 10,
      name: "Pani Puri (6 pcs)",
      price: 50,
      description: "Crispy shells with tangy spiced water",
      category: "Snacks",
      image: "https://source.unsplash.com/featured/?panipuri"
    },
    {
      id: 11,
      name: "Bhel Puri",
      price: 60,
      description: "Puffed rice with tangy chutneys",
      category: "Snacks",
      image: "https://source.unsplash.com/featured/?bhelpuri"
    },
    {
      id: 12,
      name: "Vada Pav",
      price: 45,
      description: "Spiced potato fritter in bun",
      category: "Snacks",
      image: "https://source.unsplash.com/featured/?vadapav"
    },
    {
      id: 13,
      name: "Cheese Sandwich",
      price: 80,
      description: "Grilled sandwich with cheese and vegetables",
      category: "Snacks",
      image: "https://source.unsplash.com/featured/?sandwich"
    },
    {
      id: 14,
      name: "French Fries",
      price: 90,
      description: "Crispy potato fries with seasoning",
      category: "Snacks",
      image: "https://source.unsplash.com/featured/?frenchfries"
    },
    {
      id: 15,
      name: "Veg Spring Roll",
      price: 70,
      description: "Crispy rolls with vegetable filling",
      category: "Snacks",
      image: "https://source.unsplash.com/featured/?springroll"
    },
    {
      id: 16,
      name: "Masala Chai",
      price: 30,
      description: "Indian spiced tea with milk",
      category: "Beverages",
      image: "https://source.unsplash.com/featured/?tea"
    },
    {
      id: 17,
      name: "Filter Coffee",
      price: 40,
      description: "South Indian style coffee",
      category: "Beverages",
      image: "https://source.unsplash.com/featured/?coffee"
    },
    {
      id: 18,
      name: "Hot Chocolate",
      price: 80,
      description: "Rich chocolate drink with milk",
      category: "Beverages",
      image: "https://source.unsplash.com/featured/?hotchocolate"
    },
    {
      id: 19,
      name: "Cold Coffee",
      price: 90,
      description: "Chilled coffee with ice cream",
      category: "Beverages",
      image: "https://source.unsplash.com/featured/?coldcoffee"
    },
    {
      id: 20,
      name: "Fresh Lime Soda",
      price: 50,
      description: "Refreshing lime drink with soda",
      category: "Beverages",
      image: "https://source.unsplash.com/featured/?lemonade"
    },
    {
      id: 21,
      name: "Mango Lassi",
      price: 70,
      description: "Sweet yogurt drink with mango",
      category: "Beverages",
      image: "https://source.unsplash.com/featured/?lassi"
    },
    {
      id: 22,
      name: "Fresh Orange Juice",
      price: 80,
      description: "Freshly squeezed orange juice",
      category: "Beverages",
      image: "https://source.unsplash.com/featured/?orangejuice"
    },
    {
      id: 23,
      name: "Buttermilk",
      price: 40,
      description: "Spiced yogurt-based drink",
      category: "Beverages",
      image: "https://source.unsplash.com/featured/?buttermilk"
    },
    {
      id: 24,
      name: "Iced Tea",
      price: 60,
      description: "Chilled tea with lemon",
      category: "Beverages",
      image: "https://source.unsplash.com/featured/?icedtea"
    }
  ];

  const filteredMenu = activeCategory === 'All' 
    ? foodMenu 
    : foodMenu.filter(item => item.category === activeCategory);

  const addToCart = (item) => {
    setShowCart(true);
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId) => {
    setCart(cart.filter(item => item.id !== itemId));
    if (cart.length === 1) {
      setShowCart(false);
    }
  };

  const updateQuantity = (itemId, change) => {
    setCart(cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 
          ? { ...item, quantity: newQuantity }
          : null;
      }
      return item;
    }).filter(Boolean));
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderConfirmed(true);
      setTimeout(() => {
        setOrderConfirmed(false);
        setShowCart(false);
        setCart([]);
        // Optional: Callback to parent to show success message
        // onOrderSuccess?.();
      }, 2000);
    }, 2000);
  };

  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    setIsSubmittingComplaint(true);
    setTimeout(() => {
      setIsSubmittingComplaint(false);
      setComplaintSubmitted(true);
      setTimeout(() => {
        setComplaintSubmitted(false);
        // Reset form
        setComplaintType('');
        setDescription('');
      }, 3000);
    }, 2000);
  };

  const handleEmergencyContact = () => {
    setShowEmergencyContact(true);
    setTimeout(() => {
      setShowEmergencyContact(false);
    }, 4000);
  };

  const handleAssistanceRequest = (type) => {
    setAssistanceType(type);
    setIsRequestingAssistance(true);
    setTimeout(() => {
      setIsRequestingAssistance(false);
      setAssistanceRequested(true);
      setTimeout(() => {
        setAssistanceRequested(false);
        setAssistanceType('');
      }, 4000);
    }, 2000);
  };

  const getFeedbackResponse = (rating) => {
    switch(true) {
      case rating === 5:
        return "Thank you for your excellent feedback! We're thrilled you had a great journey with BookBus.";
      case rating === 4:
        return "Thank you for your positive feedback! We're glad you enjoyed your journey with BookBus.";
      case rating === 3:
        return "Thank you for your feedback. We'll work on improving our services further.";
      case rating <= 2:
        return "We apologize for not meeting your expectations. We'll definitely work on the areas you've mentioned.";
      default:
        return "Thank you for your feedback!";
    }
  };

  const renderFoodOrder = () => (
    <div className="food-order-container">
      <h2>Order Food to Your Seat</h2>
      <p className="ticket-info">Ticket: {ticketNumber}</p>
      
      <div className="food-categories">
        {['All', 'Main Course', 'Snacks', 'Beverages'].map(category => (
          <button
            key={category}
            className={`category-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="food-menu-grid">
        {filteredMenu.map(item => (
          <div key={item.id} className="food-card">
            <div className="food-image">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="food-info">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <div className="food-price">₹{item.price}</div>
              <button 
                className="add-to-cart"
                onClick={() => addToCart(item)}
              >
                Add to Cart <FaShoppingCart />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showCart && cart.length > 0 && (
        <>
          <div className="cart-backdrop" onClick={() => !isCheckingOut && !orderConfirmed && setShowCart(false)} />
          <div className="cart-summary">
            {isCheckingOut ? (
              <div className="checkout-animation">
                <div className="loader"></div>
                <p>Processing your order...</p>
              </div>
            ) : orderConfirmed ? (
              <div className="order-confirmed">
                <div className="check-mark">✓</div>
                <h3>Order Confirmed!</h3>
                <p>Your food will be served shortly</p>
              </div>
            ) : (
              <>
                <div className="cart-header">
                  <h3>Your Order</h3>
                  <button 
                    className="close-cart"
                    onClick={() => setShowCart(false)}
                  >
                    <FaTimes />
                  </button>
                </div>
                
                <div className="cart-items">
                  {cart.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="cart-item-info">
                        <div className="cart-item-name">{item.name}</div>
                        <div className="cart-item-price">₹{item.price}</div>
                      </div>
                      <div className="cart-item-quantity">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          +
                        </button>
                        <button 
                          className="remove-item"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="cart-total">
                  <span>Total Amount:</span>
                  <span>₹{calculateTotal()}</span>
                </div>

                <button 
                  className="checkout-btn"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  Proceed to Checkout (₹{calculateTotal()}) <FaArrowRight />
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );

  const renderComplaint = () => (
    <div className="complaint-container">
      <h2>Register Your Complaint</h2>
      <p className="ticket-info">Ticket: {ticketNumber}</p>

      {isSubmittingComplaint ? (
        <div className="complaint-animation">
          <div className="complaint-loader"></div>
          <p>Filing your complaint...</p>
        </div>
      ) : complaintSubmitted ? (
        <div className="complaint-success">
          <div className="success-icon">✓</div>
          <h3>Complaint Filed Successfully!</h3>
          <p>We'll look into this matter immediately</p>
          <p className="reference">Reference ID: {`COMP${Date.now().toString().slice(-6)}`}</p>
        </div>
      ) : showEmergencyContact ? (
        <div className="emergency-contact-popup">
          <div className="emergency-icon">!</div>
          <h3>Emergency Contact Initiated</h3>
          <p>A bus-keeper will contact you shortly</p>
          <p className="apology">Sorry for the inconvenience!</p>
        </div>
      ) : (
        <div className="complaint-form">
          <div className="form-group">
            <label>Type of Complaint</label>
            <select 
              value={complaintType}
              onChange={(e) => setComplaintType(e.target.value)}
              className="complaint-select"
              required
            >
              <option value="">Select Complaint Type</option>
              <option value="cleanliness">Cleanliness Issue</option>
              <option value="ac">AC Not Working</option>
              <option value="staff">Staff Behavior</option>
              <option value="delay">Journey Delay</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="complaint-textarea"
              placeholder="Please describe your issue in detail..."
              required
            />
          </div>

          <div className="complaint-actions">
            <button 
              className="submit-complaint"
              onClick={handleComplaintSubmit}
            >
              Submit Complaint <FaPaperPlane />
            </button>
            <button 
              className="emergency-contact"
              onClick={handleEmergencyContact}
            >
              Emergency Contact <FaPhone />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderAssistance = () => (
    <div className="assistance-container">
      <h2>Request Assistance</h2>
      <p className="ticket-info">Ticket: {ticketNumber}</p>

      {isRequestingAssistance ? (
        <div className="assistance-animation">
          <div className="assistance-loader"></div>
          <p>Requesting {assistanceType}...</p>
        </div>
      ) : assistanceRequested ? (
        <div className="assistance-success">
          <div className="assistance-icon">
            {assistanceType === 'Medical Help' ? '🚑' : 
             assistanceType === 'Technical Issue' ? '🔧' : '👨‍✈️'}
          </div>
          <h3>Help is on the way!</h3>
          <p>A bus keeper will contact you shortly</p>
          <p className="assistance-apology">Sorry for any inconvenience!</p>
          <div className="assistance-ticket">
            Request ID: {`REQ${Date.now().toString().slice(-6)}`}
          </div>
        </div>
      ) : (
        <div className="assistance-options">
          <button 
            className="assistance-btn attendant"
            onClick={() => handleAssistanceRequest('Call Attendant')}
          >
            <FaHeadset />
            <span>Call Attendant</span>
          </button>
          <button 
            className="assistance-btn medical"
            onClick={() => handleAssistanceRequest('Medical Help')}
          >
            <FaPhone />
            <span>Medical Help</span>
          </button>
          <button 
            className="assistance-btn technical"
            onClick={() => handleAssistanceRequest('Technical Issue')}
          >
            <FaExclamationCircle />
            <span>Technical Issue</span>
          </button>
        </div>
      )}
    </div>
  );

  const renderFeedback = () => (
    <div className="feedback-container">
      <h2>Share Your Feedback</h2>
      <p className="ticket-info">Ticket: {ticketNumber}</p>

      {isSubmittingFeedback ? (
        <div className="feedback-animation">
          <div className="feedback-loader"></div>
          <p>Submitting your feedback...</p>
        </div>
      ) : feedbackSubmitted ? (
        <div className="feedback-success">
          <div className="feedback-response-icon">
            {rating >= 4 ? '🌟' : rating >= 3 ? '👍' : '🙏'}
          </div>
          <h3>Feedback Received!</h3>
          <p className="response-message">{getFeedbackResponse(rating)}</p>
          <div className="feedback-reference">
            Feedback ID: FB{Date.now().toString().slice(-6)}
          </div>
        </div>
      ) : (
        <div className="feedback-form">
          <div className="rating-section">
            <h3>Rate Your Experience</h3>
            <div className="star-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  className={`star ${star <= rating ? 'active' : ''}`}
                  onClick={() => setRating(star)}
                />
              ))}
            </div>
          </div>

          <div className="feedback-input-section">
            <textarea
              placeholder="Share your experience with us..."
              className="feedback-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          <button 
            className="submit-feedback"
            onClick={() => {
              setIsSubmittingFeedback(true);
              setTimeout(() => {
                setIsSubmittingFeedback(false);
                setFeedbackSubmitted(true);
                setTimeout(() => {
                  setFeedbackSubmitted(false);
                  setRating(0);
                  setDescription('');
                }, 5000);
              }, 2000);
            }}
          >
            Submit Feedback <FaPaperPlane />
          </button>
        </div>
      )}
    </div>
  );

  const renderTrackBus = () => {
    const handleTrackNow = () => {
      setShowTracker(true);
      setIsLoading(true);
      
      // Simulate loading
      setTimeout(() => {
        setBusData({
          busName: "BookBus Express",
          routeNumber: "BB-2024",
          currentLocation: "Bangalore Electronic City",
          destination: "Chennai Central",
          estimatedTime: "2 hours 30 minutes",
          nextStop: "Hosur",
          lastUpdated: "2 minutes ago",
          completedDistance: 70,
        });
        setIsLoading(false);
      }, 2000);
    };

    return (
      <div className="track-bus-container">
        <h2>Track Your Bus</h2>
        <p className="ticket-info">Ticket: {ticketNumber}</p>

        {!showTracker ? (
          <div className="track-form">
            <button 
              className="track-now-btn"
              onClick={handleTrackNow}
            >
              Track Now <FaLocationArrow />
            </button>
          </div>
        ) : (
          <div className="bus-tracker">
            {isLoading ? (
              <div className="tracker-loading">
                <div className="tracker-loader">
                  <div className="bus-animation">🚌</div>
                </div>
                <p>Locating your bus...</p>
              </div>
            ) : (
              <div className="tracking-result">
                <h3>Bus Located!</h3>
                <div className="tracking-details">
                  <p><strong>Bus:</strong> {busData?.busName}</p>
                  <p><strong>Route:</strong> {busData?.routeNumber}</p>
                  <p><strong>Current Location:</strong> {busData?.currentLocation}</p>
                  <p><strong>Next Stop:</strong> {busData?.nextStop}</p>
                  <p><strong>ETA:</strong> {busData?.estimatedTime}</p>
                  <p><strong>Last Updated:</strong> {busData?.lastUpdated}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderContent = () => {
    switch(type) {
      case 'food':
        return renderFoodOrder();
      case 'complaint':
        return renderComplaint();
      case 'assistance':
        return renderAssistance();
      case 'feedback':
        return renderFeedback();
      case 'track':
        return renderTrackBus();
      default:
        return null;
    }
  };

  return (
    <div className="service-page">
      <button className="back-button" onClick={onBack}>
        <FaArrowLeft /> Back to Services
      </button>
      <div className="tracking-section">
        {renderContent()}
      </div>
    </div>
  );
};

export default ServicePages;
