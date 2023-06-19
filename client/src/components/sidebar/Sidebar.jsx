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

        const res = await axios.get("http://localhost:8000/api/user/friends/" + currentUser._id);
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
            <Home className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              <Link style={style} to={'/'}>Home</Link>
            </span>
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
            <Group className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Group
            </span>
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
