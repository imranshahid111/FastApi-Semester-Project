import React, { useState } from 'react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setError('Please enter a valid email address');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setError(null);
      } else {
        setError(data.detail || 'An error occurred');
        setSuccess(false);
      }
    } catch (err) {
      setError('Something went wrong. Please try again later.');
      setSuccess(false);
    }
  };

  return (
    <div className="container mt-5 vh-100">
      <h2><b>Forgot Password</b></h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && (
        <div className="alert alert-success">
          If the email is registered, you will receive a password reset link.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <b><label htmlFor="email">Email Address</label></b>
          <input
            type="email"
            className="form-control"
            style={{marginBottom:"10px"}}
            id="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-3">
          Send Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
