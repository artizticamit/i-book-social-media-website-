// eslint-disable-next-line no-undef no-unused-vars

import { BrowserRouter as Router, Route, Link, Routes , Navigate} from "react-router-dom";
import React from 'react';

import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";
import {AuthContext} from "./context/AuthContext";
import {useContext} from "react";


function App() {
  const {user} = useContext(AuthContext);
  return ( 
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={
            user ?<Home />: <Login/> 
          }/>

          <Route path='/signup' element={
           user?<Login />: <Signup />
          }/>

          <Route path='/login' element={
            user? <Navigate to="/" /> :<Login />
          }/>

          <Route path='/profile/:username' element={<Profile />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
