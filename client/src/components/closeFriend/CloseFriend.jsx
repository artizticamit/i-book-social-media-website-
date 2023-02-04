import "./closeFriend.css";
import React from 'react'
import ReactDOM from 'react-dom'


export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(user)
  return (
    <li className="sidebar-friend-list-item">
        <img src={"/assets/"+user.profilePicture} alt="" className="sidebar-friend-img" />
        <span className="sidebar-friend-name">{user.username}</span>
    </li>
  )
}
