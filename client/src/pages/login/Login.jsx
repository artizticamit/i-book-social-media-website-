import React from 'react'
import "./login.css";
import { useState, useEffect, useRef, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { loginCall } from '../../apiCalls';
import { AuthContext } from '../../context/AuthContext';
import { CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';

export default function Register() {

  // const [user, setUser] = useState(null);

  const email = useRef();
  const password = useRef();


  const { user, isFetching, error, dispatch } = useContext(AuthContext);

  const handleClick = (e) => {
    e.preventDefault();
    loginCall({ email: email.current.value, password: password.current.value }, dispatch);
  }

  console.log(user);

  return (
    <>
      <div className="register-container">
        <form className="register-wrapper" onSubmit={handleClick}>
          <input type="email" className="input-email" placeholder='Email' required ref={email} />
          <input type="password" className="input-password" placeholder='Password' required minLength="6" ref={password} />
          <button type="submit" className='register-btn' disabled={isFetching}>
            { 
              isFetching 
              ? (<CircularProgress size="20px" />)
              : ("Log In")
            }
          </button>
          <Link to="/signup">
            <p className="register-link">Don't have an account? <span className="register-link-span">Sign Up</span></p>
          </Link>
        </form>
      </div>
    </>
  )
}
