
import {Search, Person, Message, Notifications, ToggleOffOutlined} from "@mui/icons-material"
// import MessageIcon from '@mui/icons-material/Message';
import "./topbar.css"
import {Link} from "react-router-dom";
import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import { useEffect, useState } from "react";




export default function Topbar({username}) {
    const [userData, setUserData] = useState({});
    // console.log("username = "+ username);

    useEffect(()=>{
        const fetchUserData = async () => {
            const res = await axios.get("http://localhost:8000/api/user?username="+username);
            setUserData(res.data);
            // console.log("res =",res);
        }
        fetchUserData();
    }, [])
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
                    <a href={`/profile/${userData.username}`}> <img className='image' src={PF + (userData.profilePicture!==""?userData.profilePicture: "person/noAvatar.png")} alt="" /> </a>
                </div>
            </div>
        </div>
    </>
  )
}
