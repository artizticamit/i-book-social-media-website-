import React from 'react'
import {Search, Person, Message, Notifications, ToggleOffOutlined} from "@mui/icons-material"
// import MessageIcon from '@mui/icons-material/Message';
import "./topbar.css"



export default function Topbar() {
    // const toggle = document.querySelector(".toggle-icon");
    // toggle.addEventListener("click", (e)=>{
    //     e.target.style.backgroundColor = "white";
    // })
  return (
    <>
        <div className="container">
            <div className="icon-container">
                <p className="icon">I-Book</p>
            </div>
            <div className="searchbar-container">
                <div className="search-icon">
                    
                    <Search />
                </div>
                <input type="text" placeholder='Search something.....' className='search-box' />
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
                    <img className='image' src="./assets/person/1.jpeg" alt="" />
                </div>
            </div>
        </div>
    </>
  )
}
