import React, { useState } from 'react';
import Navbar from './Navbar';
import { FaSearch, FaExchangeAlt, FaBell, FaCog, FaUser, FaBars, FaRobot, FaGift, FaHotel, FaUtensils, FaCar, FaPlane, FaTrain, FaStar, FaHeart, FaReply, FaThumbsUp, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaCcVisa, FaCcMastercard, FaGooglePay, FaPaypal, FaSearchLocation, FaMapMarkedAlt, FaRoute, FaPaperPlane, FaHeadset, FaFirstAid, FaComments } from 'react-icons/fa';
import './Dashboard.css';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { useNotifications } from '../../context/NotificationContext';
import Notifications from './Notifications';
import ServicePages from '../InJourneyServices/ServicePages';

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const { unreadCount } = useNotifications();
  const [showNotifications, setShowNotifications] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    // Handle search logic here
    console.log('Searching buses...', { fromLocation, toLocation, journeyDate });
  };

  const handleSearchBuses = (e) => {
    e.preventDefault();
    navigate('/bus-results', {
      state: {
        from: fromLocation,
        to: toLocation,
        date: journeyDate
      }
    });
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
  };

  // Sample locations for dropdown
  const locations = [
    'Bangalore',
    'Chennai',
    'Hyderabad',
    'Mumbai',
    'Delhi',
    'Kolkata',
    'Pune',
    'Kochi',
    'Mysore',
    'Coimbatore'
  ];

  const AIOffersSection = () => {
    return (
      <section className="ai-offers-section">
        <div className="ai-header">
          <div className="ai-title">
            <FaRobot className="ai-icon" />
            <h2>BookBus Travel Offers</h2>
          </div>
          <p className="ai-subtitle">Personalized recommendations just for you</p>
        </div>

        <div className="offers-container">
          <div className="offer-card premium">
            <div className="offer-badge">Premium</div>
            <h3>Weekend Gateway</h3>
            <p>30% off on round trips</p>
            <div className="offer-details">
              <span>Valid till: Next 48 hours</span>
              <button className="claim-btn">Claim Now</button>
            </div>
          </div>

          <div className="offer-card special">
            <div className="offer-badge">Special</div>
            <h3>First Trip Bonus</h3>
            <p>Extra ₹200 cashback</p>
            <div className="offer-details">
              <span>For new users</span>
              <button className="claim-btn">Claim Now</button>
            </div>
          </div>

          <div className="offer-card seasonal">
            <div className="offer-badge">Seasonal</div>
            <h3>Summer Special</h3>
            <p>Free meal voucher</p>
            <div className="offer-details">
              <span>Limited time offer</span>
              <button className="claim-btn">Claim Now</button>
            </div>
          </div>
        </div>

        <div className="upcoming-features">
          <h2>Services we offer</h2>
          <div className="features-grid">
            <div className="feature-card">
              <FaHotel className="feature-icon" />
              <h3>Hotel Bookings</h3>
              <p>Seamless hotel reservations at your destination</p>
            </div>
            
            <div className="feature-card">
              <FaUtensils className="feature-icon" />
              <h3>Meal Preferences</h3>
              <p>Pre-book your favorite meals for the journey</p>
            </div>
            
            <div className="feature-card">
              <FaCar className="feature-icon" />
              <h3>Cab Services</h3>
              <p>Book cabs for pickup and drop</p>
            </div>
            
            <div className="feature-card">
              <FaPlane className="feature-icon" />
              <h3>Multi-Modal Transit</h3>
              <p>Combined bus, train & flight bookings</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const ReviewsSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [newComment, setNewComment] = useState('');
    const reviewsPerView = 3;
    
    // Add reviews state
    const [reviews, setReviews] = useState([
      {
        id: 1,
        user: "Priya Sharma",
        avatar: "https://i.pravatar.cc/150?img=1",
        rating: 5,
        date: "2 days ago",
        comment: "Amazing experience with BookBus! The seats were comfortable and the journey was smooth. Will definitely book again.",
        likes: 24,
        replies: []
      },
      {
        id: 2,
        user: "Rahul Verma",
        avatar: "https://i.pravatar.cc/150?img=2",
        rating: 4,
        date: "1 week ago",
        comment: "Great service and punctual departure. The online booking process was very smooth. Just wish there were more snack options.",
        likes: 18,
        replies: []
      },
      {
        id: 3,
        user: "Anita Desai",
        avatar: "https://i.pravatar.cc/150?img=3",
        rating: 5,
        date: "2 weeks ago",
        comment: "The best part was the real-time tracking feature. Kept my family informed throughout the journey. Excellent service!",
        likes: 32,
        replies: []
      },
      {
        id: 4,
        user: "Karthik Raja",
        avatar: "https://i.pravatar.cc/150?img=4",
        rating: 5,
        date: "3 days ago",
        comment: "Very professional service. The bus was clean and the staff was courteous. The journey was comfortable and on time.",
        likes: 28,
        replies: []
      },
      {
        id: 5,
        user: "Meera Patel",
        avatar: "https://i.pravatar.cc/150?img=5",
        rating: 4,
        date: "5 days ago",
        comment: "Good experience overall. The online booking system is very user-friendly. Would recommend to others.",
        likes: 15,
        replies: []
      }
    ]);

    const handlePrevious = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex > 0 ? prevIndex - 1 : 0
      );
    };

    const handleNext = () => {
      setCurrentIndex((prevIndex) => 
        prevIndex < reviews.length - reviewsPerView ? prevIndex + 1 : prevIndex
      );
    };

    const getCardStyle = (index) => {
      const isFirstCard = index === 0;
      const isLastCard = index === reviews.length - 1;
      const isVisible = index >= currentIndex && index < currentIndex + reviewsPerView;
      
      return {
        opacity: isVisible ? 1 : 0.7,
        transform: `translateX(-${currentIndex * 370}px)`,
        transition: 'all 0.5s ease'
      };
    };

    const handleAddComment = (e) => {
      e.preventDefault();
      if (!newComment.trim()) return;

      const newReview = {
        id: reviews.length + 1,
        user: "You",
        avatar: "https://i.pravatar.cc/150?img=8",
        rating: 5,
        date: "Just now",
        comment: newComment,
        likes: 0,
        replies: []
      };

      setReviews([newReview, ...reviews]);
      setNewComment('');
    };

    return (
      <section className="reviews-section">
        <div className="reviews-header">
          <h2>Traveler Experiences</h2>
          <p>Real stories from our happy travelers</p>
        </div>

        <div className="reviews-container">
          <div className="reviews-slider">
            {reviews.map((review, index) => (
              <div 
                key={review.id} 
                className="review-card"
                style={getCardStyle(index)}
              >
                <div className="review-header">
                  <img src={review.avatar} alt={review.user} className="user-avatar" />
                  <div className="review-info">
                    <h4>{review.user}</h4>
                    <div className="rating">
                      {[...Array(review.rating)].map((_, i) => (
                        <FaStar key={i} className="star-icon" />
                      ))}
                    </div>
                    <span className="review-date">{review.date}</span>
                  </div>
                </div>

                <p className="review-content">{review.comment}</p>

                <div className="review-actions">
                  <button className="action-btn">
                    <FaThumbsUp /> {review.likes}
                  </button>
                  <button className="action-btn">
                    <FaReply /> Reply
                  </button>
                </div>

                {/* Replies */}
                {review.replies.length > 0 && (
                  <div className="replies-container">
                    {review.replies.map((reply, index) => (
                      <div key={index} className="reply-card">
                        <div className="reply-header">
                          <strong>{reply.user}</strong>
                          <span className="reply-date">{reply.date}</span>
                        </div>
                        <p>{reply.comment}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="reviews-navigation">
            <button 
              className={`scroll-btn ${currentIndex === 0 ? 'disabled' : ''}`}
              onClick={handlePrevious}
              disabled={currentIndex === 0}
            >
              ← Previous
            </button>
            <button 
              className={`scroll-btn ${
                currentIndex >= reviews.length - reviewsPerView ? 'disabled' : ''
              }`}
              onClick={handleNext}
              disabled={currentIndex >= reviews.length - reviewsPerView}
            >
              Next →
            </button>
          </div>

          <div className="comment-section">
            <h3>Share Your Experience</h3>
            <form onSubmit={handleAddComment} className="comment-form">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Write your review here..."
                className="comment-input"
              />
              <button type="submit" className="comment-submit">
                Post Review
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  };

  const Footer = () => {
    return (
      <footer className="footer-section">
        <div className="footer-container">
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-column">
              <h3>BookBus.com</h3>
              <p className="company-desc">
                Your trusted partner for safe and comfortable bus travel across India.
                Experience seamless booking and journey planning.
              </p>
              <div className="social-links">
                <a href="#"><FaFacebook /></a>
                <a href="#"><FaTwitter /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaLinkedin /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-column">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#">About Us</a></li>
                <li><a href="#">Bus Routes</a></li>
                <li><a href="#">Offers & Discounts</a></li>
                <li><a href="#">Booking Terms</a></li>
                <li><a href="#">Cancellation Policy</a></li>
              </ul>
            </div>

            {/* Support */}
            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><a href="#">Help Center</a></li>
                <li><a href="#">Track Booking</a></li>
                <li><a href="#">Contact Us</a></li>
                <li><a href="#">FAQs</a></li>
                <li><a href="#">Safety Guidelines</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="footer-column">
              <h4>Contact Us</h4>
              <div className="contact-info">
                <p><FaPhone /> 24/7 Support: 1800-123-4567</p>
                <p><FaEnvelope /> support@bookbus.com</p>
                <p><FaMapMarkerAlt /> 123 Travel Plaza, Bangalore</p>
                <p><FaClock /> Mon - Sun: 24/7 Available</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="footer-bottom">
            <div className="footer-info">
              <div className="info-section">
                <h5>Popular Routes</h5>
                <p>Bangalore → Mumbai • Delhi → Jaipur  Chennai → Hyderabad</p>
              </div>
              <div className="info-section">
                <h5>We Accept</h5>
                <div className="payment-icons">
                  <FaCcVisa />
                  <FaCcMastercard />
                  <FaGooglePay />
                  <FaPaypal />
                  
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="copyright">
            <p>© 2024 BookBus. All rights reserved.</p>
            <div className="legal-links">
              <a href="#">Privacy Policy</a>
              <span>•</span>
              <a href="#">Terms of Service</a>
              <span>•</span>
              <a href="#">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };

  const BusTrackingSection = () => {
    return (
      <section className="bus-tracking-section">
        <div className="tracking-container">
          <div className="tracking-header">
            <h2>Track Your Bus</h2>
            <p>Real-time tracking for your journey</p>
          </div>

          <div className="tracking-form">
            <div className="form-input">
              <input 
                type="text" 
                placeholder="Enter Ticket/PNR Number"
                className="tracking-input"
              />
              <button className="track-button">
                <FaSearchLocation /> Track Now
              </button>
            </div>
          </div>

          <div className="tracking-features">
            <div className="feature-card">
              <FaMapMarkedAlt className="feature-icon" />
              <h3>Live Location</h3>
              <p>Track your bus location in real-time with GPS accuracy</p>
            </div>

            <div className="feature-card">
              <FaClock className="feature-icon" />
              <h3>ETA Updates</h3>
              <p>Get accurate estimated time of arrival at your destination</p>
            </div>

            <div className="feature-card">
              <FaBell className="feature-icon" />
              <h3>Smart Alerts</h3>
              <p>Receive notifications about delays and route updates</p>
            </div>

            <div className="feature-card">
              <FaRoute className="feature-icon" />
              <h3>Route Info</h3>
              <p>View detailed route information and upcoming stops</p>
            </div>
          </div>
        </div>
      </section>
    );
  };

  const InJourneyServices = () => {
    const [activeTicket, setActiveTicket] = useState('');
    const [requestType, setRequestType] = useState('');
    const [showServicePage, setShowServicePage] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      setShowServicePage(true);
    };

    if (showServicePage) {
      return (
        <ServicePages 
          type={requestType}
          ticketNumber={activeTicket}
          onBack={() => setShowServicePage(false)}
        />
      );
    }

    return (
      <section className="in-journey-section">
        <div className="journey-container">
          <div className="journey-header">
            <h2>In-Journey Services</h2>
            <p>Exclusive services for passengers currently traveling</p>
          </div>

          <div className="journey-form-container">
            <form onSubmit={handleSubmit} className="journey-form">
              <div className="ticket-verification">
                <input
                  type="text"
                  placeholder="Enter your Ticket/PNR Number"
                  value={activeTicket}
                  onChange={(e) => setActiveTicket(e.target.value)}
                  required
                  className="ticket-input"
                />
              </div>

              <div className="service-selection">
                <select
                  value={requestType}
                  onChange={(e) => setRequestType(e.target.value)}
                  required
                  className="service-select"
                >
                  <option value="">Select Service Type</option>
                  <option value="food">Order Food</option>
                  <option value="complaint">Register Complaint</option>
                  <option value="assistance">Request Assistance</option>
                  <option value="feedback">Share Feedback</option>
                </select>
              </div>

              <button type="submit" className="submit-request">
                Submit Request <FaPaperPlane />
              </button>
            </form>

            <div className="service-features">
              <div className="service-card">
                <FaUtensils className="service-icon" />
                <h3>Food Service</h3>
                <p>Order snacks and meals during your journey</p>
              </div>

              <div className="service-card">
                <FaHeadset className="service-icon" />
                <h3>24/7 Support</h3>
                <p>Instant assistance for any concerns</p>
              </div>

              <div className="service-card">
                <FaFirstAid className="service-icon" />
                <h3>Emergency Help</h3>
                <p>Immediate response for urgent situations</p>
              </div>

              <div className="service-card">
                <FaComments className="service-icon" />
                <h3>Live Feedback</h3>
                <p>Share your experience in real-time</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className={`dashboard ${isDarkMode ? 'dark' : 'light'}`}>
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="dashboard-container">
        
        <main className="main-content">
          <div className="search-section">
            <h2>Book Bus Tickets</h2>
            <form onSubmit={handleSearchBuses} className="search-form">
              <div className="search-grid">
                <div className="form-group">
                  <label>From</label>
                  <select 
                    value={fromLocation} 
                    onChange={(e) => setFromLocation(e.target.value)}
                    required
                  >
                    <option value="">Starting point</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                

                <div className="form-group">
                  <label>To</label>
                  <select 
                    value={toLocation} 
                    onChange={(e) => setToLocation(e.target.value)}
                    required
                  >
                    <option value="">Select Destination</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="journeyDate">Date of Journey</label>
                  <input 
                    id="journeyDate"
                    type="date" 
                    value={journeyDate}
                    onChange={(e) => setJourneyDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    required
                    placeholder="Select date"
                  />
                </div>
              </div>

              <button type="submit" className="search-button">
                <FaSearch /> Search Buses
              </button>
            </form>
          </div>

          {/* Rest of your dashboard content */}
          <div className="dashboard-cards">
            <div className="card">
              <h3>Total Bookings</h3>
              <p>1,25,000+</p>
            </div>
            <div className="card">
              <h3>Active Bookings</h3>
              <p>30,000+</p>
            </div>
            <div className="card">
              <h3>Completed Trips</h3>
              <p>1,22,001</p>
            </div>
          </div>
        </main>
      </div>
      {showNotifications ? (
        <Notifications />
      ) : null}
      <InJourneyServices />
      <BusTrackingSection />
      <AIOffersSection />
      <ReviewsSection />
      <Footer />
    </div>
  );
}

export default Dashboard;
