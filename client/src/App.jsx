import { BrowserRouter as Router, Route, Link, Routes, Switch } from "react-router-dom";
import React from 'react';

import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";


function App() {
  return ( 
    <>
      <Router>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route exact path='/signup' element={<Signup />}/>
          <Route exact path='/login' element={<Login />}/>
          <Route exact path='/profile/:username' element={<Profile />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
