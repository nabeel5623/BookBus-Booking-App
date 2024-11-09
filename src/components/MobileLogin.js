import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MobileLogin.css';

function MobileLogin({ onLogin }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [useOtp, setUseOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
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

  const handleOtpChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      if (value.length <= 6) {
        setOtp(value);
        if (value.length > 0 && value.length < 6) {
          setOtpError('OTP must be 6 digits');
        } else {
          setOtpError('');
        }
      }
    }
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (mobile.length === 10) {
      // Add your OTP sending logic here
      setOtpSent(true);
      alert('OTP sent to your mobile number!');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (mobile.length !== 10) {
      setMobileError('Mobile number must be 10 digits');
      return;
    }

    if (!useOtp && passwordError) {
      return;
    }

    if (useOtp && otp.length !== 6) {
      setOtpError('Please enter valid OTP');
      return;
    }

    // Call the onLogin function passed from App.js
    onLogin();
    
    // Navigate to dashboard
    navigate('/dashboard');
  };

  return (
    <div className="mobile-login-container">
      <form className="mobile-login-form" onSubmit={handleSubmit}>
        <h2>Login via Mobile</h2>
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

        {useOtp ? (
          <div className="otp-section">
            <label>OTP:</label>
            <div className="otp-input">
              <input
                type="text"
                value={otp}
                onChange={handleOtpChange}
                placeholder="Enter 6-digit OTP"
                maxLength="6"
                required={useOtp}
              />
            </div>
            {otpError && <span className="error-message">{otpError}</span>}
            {!otpSent && (
              <button type="button" onClick={handleSendOtp} className="send-otp-btn">
                Send OTP
              </button>
            )}
          </div>
        ) : (
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="8-16 characters, start with uppercase"
              required={!useOtp}
            />
            {passwordError && <span className="error-message">{passwordError}</span>}
          </div>
        )}

        <button type="submit">Login</button>

        <div className="login-options">
          <a href="#" onClick={(e) => {
            e.preventDefault();
            setUseOtp(!useOtp);
            setPassword('');
            setOtp('');
          }}>
            {useOtp ? 'Login with Password' : 'Login with OTP'}
          </a>
        </div>

        <div className="back-to-login">
          <Link to="/login">Back to Login</Link>
        </div>
      </form>
    </div>
  );
}

export default MobileLogin;
