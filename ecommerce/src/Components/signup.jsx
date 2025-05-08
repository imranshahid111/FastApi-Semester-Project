import React, { useState } from 'react';
import '../App.css';
import { GoogleLogin } from '@react-oauth/google';
import { BASE_URL, googleLogin } from '../../utils/api';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Add navigate import

const Signup = () => {
  const navigate = useNavigate(); // ✅ useNavigate hook to navigate after successful signup

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameError, setNameError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');
    setNameError('');

    // Email validation
    if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      isValid = false;
    }

    // Password validation
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    }

    // Name validation
    if (!name.trim()) {
      setNameError('Full name is required');
      isValid = false;
    }

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;  // Don't proceed if validation fails

    try {
      const payload = {
        email: email,
        full_name: name,
        password: password,
      };
      const res = await axios.post(`${BASE_URL}/auth/signup`, payload);
      localStorage.setItem('token', res.data.access_token);
      // setIsLoggedIn(true); 
      navigate('/'); // Redirect to the home page on successful signup
      window.location.reload();
    } catch (error) {
      console.log(error);
      alert("Signup failed");
    }
  };

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse.credential;
    if (!token) {
      alert("No credential received");
      return;
    }
    try {
      const res = await googleLogin(token);
      localStorage.setItem('token', res.access_token);
      window.location.reload()
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Signup failed on server");
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="img-fluid" alt="Sample" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="align-items-center mb-4">
                <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Login Failed")} />
              </div>
              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              {/* Full Name input */}
              <div className="form-outline mb-4">
                <input type="text" className="form-control form-control-lg"
                  placeholder="Enter your Name"
                  value={name} onChange={(e) => setName(e.target.value)} />
                {/* <label className="form-label">Full Name</label> */}
                {nameError && <p className="text-danger">{nameError}</p>}
              </div>

              {/* Email input */}
              <div className="form-outline mb-4">
                <input type="email" className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={email} onChange={(e) => setEmail(e.target.value)} />
                {/* <label className="form-label">Email address</label> */}
                {emailError && <p className="text-danger">{emailError}</p>}
              </div>

              {/* Password input */}
              <div className="form-outline mb-3">
                <input type="password" className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password} onChange={(e) => setPassword(e.target.value)} />
                {/* <label className="form-label">Password</label> */}
                {passwordError && <p className="text-danger">{passwordError}</p>}
              </div>

              {/* Confirm Password (optional) */}
              {/* <div className="form-outline mb-3">
                <input type="password" className="form-control form-control-lg"
                  placeholder="Enter password again"
                  value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <label className="form-label">Confirm Password</label>
              </div> */}

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" id="rememberMe" />
                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                {/* <a href="#!" className="text-body">Forgot password?</a> */}
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button type="submit" className="btn btn-primary btn-lg"
                  onClick={handleRegister}
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}>
                  Register
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Already have an account? <a href="/login" className="link-danger">Login</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
