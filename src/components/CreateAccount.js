import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './CreateAccount.css';

function CreateAccount({ onLogin }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [rePasswordError, setRePasswordError] = useState('');
  const navigate = useNavigate();

  const handleMobileChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      if (value.length <= 10) {
        setMobile(value);
        if (value.length > 0 && value.length < 10) {
          setMobileError('Mobile number must be 10 digits');
        } else {
          setMobileError('');
        }
      }
    }
  };

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
    
    // Password validation
    if (value.length > 16) {
      setPasswordError('Password must not exceed 16 characters');
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])[A-Za-z0-9]{8,16}$/;
    if (!passwordRegex.test(value)) {
      setPasswordError(
        'Password must be 8-16 characters, start with uppercase, and contain letters and numbers'
      );
    } else {
      setPasswordError('');
    }
  };

  const handleRePasswordChange = (e) => {
    const value = e.target.value;
    setRePassword(value);
    
    if (value !== password) {
      setRePasswordError('Passwords do not match');
    } else {
      setRePasswordError('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mobile.length !== 10) {
      setMobileError('Mobile number must be 10 digits');
      return;
    }

    if (!email.endsWith('@gmail.com')) {
      setEmailError('Please enter a valid Gmail address');
      return;
    }

    if (passwordError || rePasswordError) {
      return;
    }
    
    // Call the onLogin function passed from App.js
    onLogin();
    
    // Navigate to dashboard
    navigate('/dashboard');
    
    alert('Account created successfully!');
  };

  return (
    <div className="create-account-container">
      <form className="create-account-form" onSubmit={handleSubmit}>
        <h2>Create Account</h2>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
        <div>
          <label>Mobile Number:</label>
          <input
            type="text"
            value={mobile}
            onChange={handleMobileChange}
            placeholder="Enter 10 digit mobile number"
            required
          />
          {mobileError && <span className="error-message">{mobileError}</span>}
        </div>
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
        <div>
          <label>Re-enter Password:</label>
          <input
            type="password"
            value={rePassword}
            onChange={handleRePasswordChange}
            placeholder="Re-enter your password"
            required
          />
          {rePasswordError && <span className="error-message">{rePasswordError}</span>}
        </div>
        <button type="submit">Create Account</button>
        
        <div className="back-to-login">
          <p>Already have an account?</p>
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default CreateAccount;
