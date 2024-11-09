import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import CreateAccount from './components/CreateAccount';
import MobileLogin from './components/MobileLogin';
import Dashboard from './components/Dashboard/Dashboard';
import Settings from './components/Settings/Settings';
import Account from './components/Dashboard/Account';
import BusResults from './components/Dashboard/BusResults';
import BusDetails from './components/Dashboard/BusDetails';
import Notifications from './components/Dashboard/Notifications';
import BookingExtras from './components/BookingExtras';
import BookingConfirmation from './components/BookingConfirmation';
import './App.css';
import { ThemeProvider } from './context/ThemeContext';
import './styles/global.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  return (
    <ThemeProvider>
      <Router>
        <div className="app">
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/create-account" element={<CreateAccount onLogin={handleLogin} />} />
            <Route path="/mobile-login" element={<MobileLogin onLogin={handleLogin} />} />
            <Route
              path="/dashboard"
              element={
                isAuthenticated ? (
                  <Dashboard />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/settings"
              element={
                isAuthenticated ? (
                  <Settings />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/account"
              element={
                isAuthenticated ? (
                  <Account />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route
              path="/bus-results"
              element={
                isAuthenticated ? (
                  <BusResults />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
            <Route path="/bus-details/:id" element={<BusDetails />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/booking-extras" element={<BookingExtras />} />
            <Route path="/booking-confirmation" element={<BookingConfirmation />} />
            <Route
              path="/"
              element={
                isAuthenticated ? (
                  <Navigate to="/dashboard" />
                ) : (
                  <Navigate to="/login" />
                )
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
