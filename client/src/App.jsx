import { BrowserRouter as Router, Route, Link, Routes, Switch , Navigate} from "react-router-dom";
import React from 'react';

import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Signup from "./pages/signup/Signup";




function App() {

  const [loggedIn, setLoggedIn] = React.useState(false);

  let callback = (valueFromLogin) =>{
    setLoggedIn(valueFromLogin);
  }


  return ( 
    <>
      <Router>
        <Routes>
        
          <Route exact path='/' element={
            loggedIn ? <Home />: <Navigate to='/login'/>
          }/> 
            {/* {loggedIn ? <Home/> : <Navigate to='/login'/>} */}
          
          <Route exact path='/signup' element={<Signup />}/>
          <Route exact path='/login' element={<Login loggedIn={loggedIn} callBackFunc={callback} />}/>
          <Route exact path='/profile/:username' element={<Profile />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
