import React from 'react'
import {Search, Person, Message, Notifications} from "@mui/icons-material"
// import MessageIcon from '@mui/icons-material/Message';
import "./topbar.css"

export default function Topbar() {
  return (
    <>
        <div className="container">
            <div className="icon-container">
                <p class="icon">I-Book</p>
            </div>
            <div className="searchbar-container">
                <div className="search-icon">
                    
                    <Search />
                </div>
                <input type="text" className='search-box' />
            </div>
            <div className="menu-container">
                <div className="profile menu-items">
                    <Person />
                </div>
                <div className="messages menu-items">
                    <Message />
                </div>
                <div className="notifications menu-items">
                    <Notifications />

                </div>
            </div>
            <div className="profile-pic">
                <div className="image-container">
                    <img className='image' src="./assets/person/1.jpeg" alt="" />
                </div>
            </div>
        </div>
    </>
  )
}
