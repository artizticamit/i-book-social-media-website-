
import {Search, Person, Message, Notifications, ToggleOffOutlined} from "@mui/icons-material"
// import MessageIcon from '@mui/icons-material/Message';
import "./topbar.css"
import {Link} from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";



export default function Topbar() {
    // const toggle = document.querySelector(".toggle-icon");
    // toggle.addEventListener("click", (e)=>{
    //     e.target.style.backgroundColor = "white";
    // })
    // When rendering topbar I have to check if the user is logged in or not.

    const {user:currentUser} = useContext(AuthContext);
    const {logout} = useLogout();
    const navigate = useNavigate();

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleLogout = ()=>{
        logout()
        navigate('/login')
    }
    
  return (
    <>
        <div className="container">
            <Link to="/" style={{textDecoration:"none"}} className="icon-container-link-wrapper">
                <div className="icon-container">
                    <span className="icon">I-Book</span>
                </div>
            </Link>
            
            <div className="searchbar-container">
                <div className="search-icon">
                    
                    <Search />
                </div>
                <input type="text" placeholder='Searc I-book' className='search-box' />
                <span className="search-border"></span>
            </div>
            <div className="menu-container">
                <div className="profile menu-items">
                    <Person />
                    
                </div>
                <div className="messages menu-items">
                    <Message />
                    <span className="flag"></span>
                </div>
                <div className="notifications menu-items">
                    <Notifications />
                    <span className="flag"></span>
                </div>
            </div>
            <div className="topbar-right">
                 <div className="dark-white-toggle">
                    <ToggleOffOutlined className='toggle-icon' />
                </div>
                <div className="logout">
                    <button onClick={handleLogout}>Logout</button>
                </div>
                <div className="image-container">
                    <a href={'/profile/'+currentUser.username}> <img className='image' src={currentUser.profilePicture?PF+currentUser.profilePicture:PF+"person/noAvatar.png"} alt="" /> </a>
                </div>
            </div>
        </div>
    </>
  )
}
