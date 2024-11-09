import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    const emailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    if (value && !emailRegex.test(value)) {
      setEmailError('Please enter a valid Gmail address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,16}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        'Password must be 8-16 characters, start with uppercase, and contain letters and numbers'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (emailError || passwordError) {
      return;
    }

    // Call the onLogin function passed from App.js
    onLogin();
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Book-Bus.com</h2>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="example@gmail.com"
            required
          />
          {emailError && <span className="error-message">{emailError}</span>}
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="8-16 characters, start with uppercase"
            required
          />
          {passwordError && <span className="error-message">{passwordError}</span>}
        </div>
        <button type="submit">Login</button>
        <div className="login-options">
          <Link to="/mobile-login">Login via Mobile</Link>
          <div className="account-options">
            <a href="#">Forgot Password?</a>
            <Link to="/create-account">Create Account</Link>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
