import "./closeFriend.css";
import React from 'react'
import ReactDOM from 'react-dom'


export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <li className="sidebar-friend-list-item">
        <img src={PF+user.profilePicture} alt="" className="sidebar-friend-img" />
        <span className="sidebar-friend-name">{user.username}</span>
    </li>
  )
}
