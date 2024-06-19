
import {Search, Person, Message, Notifications, ToggleOffOutlined} from "@mui/icons-material"
// import MessageIcon from '@mui/icons-material/Message';
import "./topbar.css"
import {Link} from "react-router-dom";
import React, { useState, useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useLogout } from "../../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import DehazeIcon from '@mui/icons-material/Dehaze';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';  
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


export default function Topbar() {
    // const toggle = document.querySelector(".toggle-icon");
    // toggle.addEventListener("click", (e)=>{
    //     e.target.style.backgroundColor = "white";
    // })
    // When rendering topbar I have to check if the user is logged in or not.
    const [showSidebarIcon, setShowSiderbarIcon] = useState(false);
    const [dropdownopen, setDropdownopen] = useState(false);
    
    const topbarref = useRef(null);
    
    const {user:currentUser} = useContext(AuthContext);
    const {logout} = useLogout();
    const navigate = useNavigate();
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const handleLogout = ()=>{
        logout()
        navigate('/login')
    }

    const toggleProfileDropdown = (open)=>{
        setDropdownopen(open);
    }


    useEffect(() => {
        // Close menu when clicking outside of it
        const handleClickOutside = (event) => {
          if (topbarref.current && !topbarref.current.contains(event.target)) {
            setDropdownopen(false);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    
    // ******** TODO: Drawer open for functions on right for mobile applications
    // const [drawerOpen, setDrawerOpen] = useState(false);
    // const toggleDrawer = (newOpen) => () => {
    //     setDrawerOpen(newOpen);
    //   };
    
    // const DrawerList = (
    //     <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
    //       <List>
    //         {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
    //           <ListItem key={text} disablePadding>
    //             <ListItemButton>
    //               <ListItemIcon>
    //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //               </ListItemIcon>
    //               <ListItemText primary={text} />
    //             </ListItemButton>
    //           </ListItem>
    //         ))}
    //       </List>
    //       <Divider />
    //       <List>
    //         {['All mail', 'Trash', 'Spam'].map((text, index) => (
    //           <ListItem key={text} disablePadding>
    //             <ListItemButton>
    //               <ListItemIcon>
    //                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
    //               </ListItemIcon>
    //               <ListItemText primary={text} />
    //             </ListItemButton>
    //           </ListItem>
    //         ))}
    //       </List>
    //     </Box>
    //   );


    
  return (
    <>
        <div className="container" ref={topbarref}>

            <div>
                <DehazeIcon />
            </div>

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
                    <Link to='/messages'>
                        <Message />
                    </Link>
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
                {/* <Button onClick={toggleDrawer(true)}>Open drawer</Button>
                <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
                    {DrawerList}
                </Drawer> */}

                <div className="profile-icon">
                    <AccountCircleIcon sx={{ fontSize: 40 }} onClick={()=>{toggleProfileDropdown(!dropdownopen)}}/>

                    {
                        dropdownopen &&(
                    <div className={`dropdown-items ${dropdownopen?'show':''}`}   >
                        <div className="image-container">
                            <a href={'/profile/'+currentUser.username}> <img className='image' src={currentUser.profilePicture?PF+currentUser.profilePicture:PF+"person/noAvatar.png"} alt="" /> </a>
                            <span className="tooltip-text">View Profile</span>
                        </div>
                        <div className="logout">    
                            <button onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    )}
                </div>
                
            </div>
        </div>
    </>
  )
}
