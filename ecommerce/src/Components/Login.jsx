import React, { useState } from 'react';
import '../App.css';
import { GoogleLogin } from '@react-oauth/google';
import { googleLogin } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // ✅ axios import missing tha

const BASE_URL = 'http://localhost:8000'; // ✅ apne hisaab se BASE_URL set kar lena

const Login = () => {
  const navigate = useNavigate();

  // ✅ email aur password ke liye state banayi
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let isValid = true;

    // Reset errors
    setEmailError('');
    setPasswordError('');

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

    return isValid;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;  // Don't proceed if validation fails
  
    try {
      const payload = {
        email: email,
        password: password,
      };
      const res = await axios.post(`${BASE_URL}/auth/login`, payload);
      localStorage.setItem('token', res.data.access_token);
      navigate('/'); // Navigate to the home page or dashboard
  
      // Refresh the page after login
      window.location.reload(); // This will reload the page
    } catch (error) {
      console.log(error);
      alert("Login failed");
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
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Login failed on server");
    }
  };

  return (
    <section className="">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" className="img-fluid" alt="Sample image" />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="align-items-center mb-4">
                <GoogleLogin onSuccess={handleSuccess} onError={() => alert("Login Failed")} />
              </div>

              <div className="divider d-flex align-items-center my-4">
                <p className="text-center fw-bold mx-3 mb-0">Or</p>
              </div>

              {/* ✅ Email input controlled */}
              <div data-mdb-input-init className="form-outline mb-4">
                <input
                  type="email"
                  id="form3Example3"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <label className="form-label" htmlFor="form3Example3">Email address</label> */}
                {emailError && <p className="text-danger">{emailError}</p>}
              </div>

              {/* ✅ Password input controlled */}
              <div data-mdb-input-init className="form-outline mb-3">
                <input
                  type="password"
                  id="form3Example4"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                {passwordError && <p className="text-danger">{passwordError}</p>}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input className="form-check-input me-2" type="checkbox" id="form2Example3" />
                  <label className="form-check-label" htmlFor="form2Example3">
                    Remember me
                  </label>
                </div>
                <a href="/forget-password" className="text-body">Forgot password?</a>
              </div>

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  onClick={handleRegister}
                  type="button"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                >
                  Login
                </button>
                <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? <a href="/signup" className="link-danger">Register</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
