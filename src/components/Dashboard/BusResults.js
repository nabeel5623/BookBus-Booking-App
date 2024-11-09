import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaStar, FaBus, FaRupeeSign, FaClock, FaRegClock, FaSearch, FaFilter, FaSortAmountDown } from 'react-icons/fa';
import './BusResults.css';

function BusResults() {
  const location = useLocation();
  const navigate = useNavigate();
  const { from, to, date } = location.state || {};

  // Expanded bus data with 15 entries
  const buses = [
    {
      id: 1,
      name: "Royal Travels",
      type: "AC Sleeper",
      departureTime: "21:00",
      arrivalTime: "06:00",
      duration: "9h",
      price: 899,
      seatsAvailable: 23,
      rating: 4.5,
      amenities: ["WiFi", "USB Charging", "Blanket", "Water Bottle"],
    },
    {
      id: 2,
      name: "Express Lines",
      type: "Non-AC Seater",
      departureTime: "22:30",
      arrivalTime: "07:30",
      duration: "9h",
      price: 599,
      seatsAvailable: 15,
      rating: 4.2,
      amenities: ["Water Bottle", "Reading Light"],
    },
    {
      id: 3,
      name: "Luxury Connect",
      type: "AC Sleeper Deluxe",
      departureTime: "20:00",
      arrivalTime: "04:30",
      duration: "8h 30m",
      price: 1299,
      seatsAvailable: 8,
      rating: 4.8,
      amenities: ["WiFi", "USB Charging", "Food", "Blanket", "Entertainment"],
    },
    {
      id: 4,
      name: "Night Rider",
      type: "AC Semi Sleeper",
      departureTime: "23:00",
      arrivalTime: "08:00",
      duration: "9h",
      price: 799,
      seatsAvailable: 19,
      rating: 4.0,
      amenities: ["USB Charging", "Water Bottle"],
    },
    {
      id: 5,
      name: "Green Line",
      type: "AC Sleeper",
      departureTime: "19:30",
      arrivalTime: "05:00",
      duration: "9h 30m",
      price: 999,
      seatsAvailable: 12,
      rating: 4.3,
      amenities: ["WiFi", "Blanket", "Snacks"],
    },
    {
      id: 6,
      name: "Swift Shuttle",
      type: "Non-AC Sleeper",
      departureTime: "20:30",
      arrivalTime: "05:30",
      duration: "9h",
      price: 699,
      seatsAvailable: 25,
      rating: 3.9,
      amenities: ["Water Bottle", "Reading Light"],
    },
    {
      id: 7,
      name: "Premium Motors",
      type: "AC Sleeper Premium",
      departureTime: "21:30",
      arrivalTime: "06:30",
      duration: "9h",
      price: 1199,
      seatsAvailable: 6,
      rating: 4.7,
      amenities: ["WiFi", "USB Charging", "Meals", "Blanket", "Entertainment"],
    },
    {
      id: 8,
      name: "City Express",
      type: "AC Seater",
      departureTime: "22:00",
      arrivalTime: "07:00",
      duration: "9h",
      price: 749,
      seatsAvailable: 28,
      rating: 4.1,
      amenities: ["USB Charging", "Water Bottle"],
    },
    {
      id: 9,
      name: "Comfort Rides",
      type: "AC Sleeper",
      departureTime: "20:45",
      arrivalTime: "05:45",
      duration: "9h",
      price: 949,
      seatsAvailable: 15,
      rating: 4.4,
      amenities: ["WiFi", "USB Charging", "Blanket"],
    },
    {
      id: 10,
      name: "Metro Travels",
      type: "Non-AC Seater",
      departureTime: "21:15",
      arrivalTime: "06:15",
      duration: "9h",
      price: 549,
      seatsAvailable: 32,
      rating: 3.8,
      amenities: ["Water Bottle"],
    },
    {
      id: 11,
      name: "Golden Bus",
      type: "AC Sleeper Premium",
      departureTime: "19:00",
      arrivalTime: "04:00",
      duration: "9h",
      price: 1099,
      seatsAvailable: 10,
      rating: 4.6,
      amenities: ["WiFi", "USB Charging", "Dinner", "Blanket"],
    },
    {
      id: 12,
      name: "Silver Express",
      type: "AC Semi Sleeper",
      departureTime: "22:45",
      arrivalTime: "07:45",
      duration: "9h",
      price: 849,
      seatsAvailable: 21,
      rating: 4.2,
      amenities: ["USB Charging", "Water Bottle", "Snacks"],
    },
    {
      id: 13,
      name: "Highway King",
      type: "AC Sleeper",
      departureTime: "20:15",
      arrivalTime: "05:15",
      duration: "9h",
      price: 979,
      seatsAvailable: 18,
      rating: 4.3,
      amenities: ["WiFi", "USB Charging", "Blanket", "Water Bottle"],
    },
    {
      id: 14,
      name: "Budget Lines",
      type: "Non-AC Sleeper",
      departureTime: "21:45",
      arrivalTime: "06:45",
      duration: "9h",
      price: 649,
      seatsAvailable: 30,
      rating: 3.7,
      amenities: ["Water Bottle", "Reading Light"],
    },
    {
      id: 15,
      name: "Deluxe Connect",
      type: "AC Sleeper Luxury",
      departureTime: "19:45",
      arrivalTime: "04:45",
      duration: "9h",
      price: 1399,
      seatsAvailable: 4,
      rating: 4.9,
      amenities: ["WiFi", "USB Charging", "Meals", "Blanket", "Entertainment", "Pillow"],
    }
  ];

  const [filteredBuses, setFilteredBuses] = useState(buses);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    priceRange: [0, 2000],
    busType: [],
    rating: 0,
    departureTime: [],
    amenities: []
  });
  const [sortBy, setSortBy] = useState('recommended');

  // Filter and sort buses
  useEffect(() => {
    let result = [...buses];

    // Apply search
    if (searchTerm) {
      result = result.filter(bus => 
        bus.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.type.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply filters
    if (activeFilters.busType.length > 0) {
      result = result.filter(bus => activeFilters.busType.includes(bus.type));
    }

    if (activeFilters.rating > 0) {
      result = result.filter(bus => bus.rating >= activeFilters.rating);
    }

    if (activeFilters.priceRange[1] < 2000) {
      result = result.filter(bus => 
        bus.price >= activeFilters.priceRange[0] && 
        bus.price <= activeFilters.priceRange[1]
      );
    }

    // Apply sorting
    switch(sortBy) {
      case 'price_low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'departure':
        result.sort((a, b) => a.departureTime.localeCompare(b.departureTime));
        break;
      default:
        break;
    }

    setFilteredBuses(result);
  }, [searchTerm, activeFilters, sortBy, buses]);

  const handleViewSeats = (bus) => {
    navigate(`/bus-details/${bus.id}`, {
      state: {
        busData: {
          ...bus,
          driver: {
            name: "Rajesh Kumar",
            phone: "+91 9876543210",
            experience: "8 years",
            rating: 4.7
          }
        }
      }
    });
  };

  return (
    <div className="bus-results-page">
      {/* Add this brand header section */}
      <div className="brand-header">
        <div className="brand-content">
          <div className="brand-name">
            Book<span>Bus</span>
          </div>
          <div className="route-info">
            <div className="route-cities">
              <span>{from}</span>
              <i className="route-arrow">→</i>
              <span>{to}</span>
            </div>
            <div className="route-date">
              {new Date(date).toLocaleDateString('en-US', { 
                weekday: 'short',
                day: 'numeric',
                month: 'long'
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter Navbar */}
      <div className="results-navbar">
        <div className="search-filter-container">
          <div className="search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search by bus name or type..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-sort-controls">
            <button 
              className={`filter-btn ${showFilters ? 'active' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FaFilter />
              Filters
            </button>

            <div className="sort-dropdown">
              <FaSortAmountDown />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="recommended">Recommended</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Rating</option>
                <option value="departure">Departure Time</option>
              </select>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="filter-panel">
            <div className="filter-section">
              <h3>Price Range</h3>
              <input
                type="range"
                min="0"
                max="2000"
                step="100"
                value={activeFilters.priceRange[1]}
                onChange={(e) => setActiveFilters({
                  ...activeFilters,
                  priceRange: [0, parseInt(e.target.value)]
                })}
              />
              <div className="price-range-labels">
                <span>₹0</span>
                <span>₹{activeFilters.priceRange[1]}</span>
              </div>
            </div>

            <div className="filter-section">
              <h3>Bus Type</h3>
              {['AC Sleeper', 'Non-AC Sleeper', 'AC Seater', 'Non-AC Seater'].map(type => (
                <label key={type} className="filter-checkbox">
                  <input
                    type="checkbox"
                    checked={activeFilters.busType.includes(type)}
                    onChange={() => {
                      const newTypes = activeFilters.busType.includes(type)
                        ? activeFilters.busType.filter(t => t !== type)
                        : [...activeFilters.busType, type];
                      setActiveFilters({ ...activeFilters, busType: newTypes });
                    }}
                  />
                  {type}
                </label>
              ))}
            </div>

            <div className="filter-section">
              <h3>Minimum Rating</h3>
              {[4, 3, 2].map(rating => (
                <label key={rating} className="filter-radio">
                  <input
                    type="radio"
                    name="rating"
                    checked={activeFilters.rating === rating}
                    onChange={() => setActiveFilters({ ...activeFilters, rating })}
                  />
                  {rating}+ ⭐
                </label>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Your existing bus results display code */}
      <div className="bus-list">
        {filteredBuses.map(bus => (
          <div key={bus.id} className="bus-card">
            <div className="bus-header">
              <div className="bus-name">
                <h3>{bus.name}</h3>
                <span className="bus-type">{bus.type}</span>
              </div>
              <div className="bus-rating">
                <FaStar className="star-icon" />
                <span>{bus.rating}</span>
              </div>
            </div>

            <div className="bus-details">
              <div className="time-details">
                <div className="departure">
                  <FaClock className="time-icon" />
                  <div>
                    <p className="time">{bus.departureTime}</p>
                    <p className="label">Departure</p>
                  </div>
                </div>
                <div className="duration">
                  <span>{bus.duration}</span>
                </div>
                <div className="arrival">
                  <FaRegClock className="time-icon" />
                  <div>
                    <p className="time">{bus.arrivalTime}</p>
                    <p className="label">Arrival</p>
                  </div>
                </div>
              </div>

              <div className="amenities">
                {bus.amenities.map((amenity, index) => (
                  <span key={index} className="amenity-tag">{amenity}</span>
                ))}
              </div>

              <div className="bus-footer">
                <div className="seats-info">
                  <FaBus className="bus-icon" />
                  <span>{bus.seatsAvailable} seats available</span>
                </div>
                <div className="price-section">
                  <div className="price">
                    <FaRupeeSign />
                    <span>{bus.price}</span>
                  </div>
                  <button 
                    className="view-seats-btn"
                    onClick={() => handleViewSeats(bus)}
                  >
                    View Seats
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BusResults;
