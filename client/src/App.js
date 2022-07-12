import { BrowserRouter as Router, Route, Link, Routes, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";
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
          <Route exact path='/profile' element={<Profile />}/>
        </Routes>
      </Router>
    </>
    // <div className="App">
      
    //   <Router>
    //     <Routes>
    //       <Route exact path='/' element={<Home />} />
    //       <Route exact path='/login' element={
    //         <>
    //           <Navbar />
    //           <Login />
    //         </>
    //       } >
    //       </Route>

    //       <Route exact path='/signup' element={
    //         <>
    //           <Navbar />
    //           <Signup />
    //         </>
    //       }>
    //       </Route>

    //       <Route exact path='/profile:username' element={
    //         <>
    //           <Navbar />
    //           <Profile />
    //         </>
    //       } />
    //     </Routes>
    //   </Router>

    //   {/* <Router>
    //     <Routes>
    //       <Route path="/login" element={
    //         <>
    //           <Navbar />
    //           <Login />
    //         </>
    //       }>

    //       </Route>
    //     </Routes>
    //   </Router> */}
    // </div>
  );
}

export default App;
