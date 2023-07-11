import "./sidebar.css"
import {Home, Explore, Star, LocalFireDepartment, Group} from "@mui/icons-material"
import {Users} from "../../dummyData"
import CloseFriend from "../closeFriend/CloseFriend"
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import {Link} from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import { useContext } from "react"
import axios from 'axios'


export default function Sidebar() {
  const path = 'https://i-book-backend.onrender.com'

  const style={
    textDecoration: "none",
    color: "inherit"

  }

  const {user:currentUser, dispatch} = useContext(AuthContext);

  const [friends, setFriends] = useState([]);

  useEffect(()=>{

    const fetchFriends =async()=>{
      if(currentUser)
      {

        const res = await axios.get(`${path}/api/user/friends/` + currentUser._id);
        console.log(res)
        setFriends(res.data)
      }
      else{
        setFriends([]);
      }

    }
    fetchFriends();
    
  },[currentUser])


  return (
    <div className="sidebar-container">
      <div className="sidebarWrapper">
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
          <Link style={style} to={'/'} className="sidebar-list-item-link">
            <Home className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Home
            </span>
            </Link>
          </li>
          <li className="sidebar-list-item">
            <Explore className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Explore
            </span>
          </li>
          <li className="sidebar-list-item">
            <Star className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Popular
            </span>
          </li>
          <li className="sidebar-list-item">
            <LocalFireDepartment className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Hot Posts
            </span>
          </li>
          <li className="sidebar-list-item">
          <Link className="sidebar-list-item-link" to={`/savedposts/${currentUser?currentUser._id:'profile'}`}>

            <LocalFireDepartment className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Saved Posts
            </span>
          </Link>
          </li>
          <li className="sidebar-list-item">
          <Link to={'/group'} className="sidebar-list-item-link">

            <Group className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Group
            </span>
          </Link>
          </li>
        </ul>
        {/* <button className="sidebar-show-more-btn">Show More</button> */}
        <hr className="sidebar-hr" />
        <ul className="sidebar-friend-list">
          {friends.map((u)=>(
            <CloseFriend key={u._id} user={u} />
          ))}
          
        </ul>
      </div>
      
    </div>
  )
}
