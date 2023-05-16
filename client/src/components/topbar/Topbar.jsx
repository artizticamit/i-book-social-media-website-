
import {Search, Person, Message, Notifications, ToggleOffOutlined} from "@mui/icons-material"
// import MessageIcon from '@mui/icons-material/Message';
import "./topbar.css"
import {Link} from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom'



export default function Topbar(props) {
    // const toggle = document.querySelector(".toggle-icon");
    // toggle.addEventListener("click", (e)=>{
    //     e.target.style.backgroundColor = "white";
    // })
    // When rendering topbar I have to check if the user is logged in or not.

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
  return (
    <>
        <div className="container">
            <Link to="/" style={{textDecoration:"none"}}>
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
                <div className="image-container">
                    <a href={'/profile/'+props.user.username}> <img className='image' src={props.user.profilePicture?PF+props.user.profilePicture:PF+"person/noAvatar.png"} alt="" /> </a>
                </div>
            </div>
        </div>
    </>
  )
}
