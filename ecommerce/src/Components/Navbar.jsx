import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const state = useSelector((state) => state.handleCart);

  // Check localStorage for token on initial render
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Update the state based on the token presence
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false); // Update the state after logout
  };

  return (
    <nav className="navbar navbar-expand-lg  bg-[#e7d1aa] ">
      <div className="container">
        <Link className="navbar-brand" to="/">AAI Collection</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="d-flex place-item-center collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/products">Product</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>
          <div className="buttons">
            {!isLoggedIn ? (
              <>
                <Link to='/login' className='btn btn-outline-dark'>
                  <i className="fa-solid fa-right-to-bracket me-1"></i>Login
                </Link>
                <Link to='/signup' className='btn btn-outline-dark ms-2'>
                  <i className="fa fa-user-plus me-1"></i>Signup
                </Link>
              </>
            ) : (
              <button className='btn btn-outline-dark ms-2' onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket me-1"></i>Logout
              </button>
            )}
            <Link className='btn btn-outline-dark ms-2'>
              <i className="fa fa-shopping-cart me-1"></i>Cart {state.length}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
