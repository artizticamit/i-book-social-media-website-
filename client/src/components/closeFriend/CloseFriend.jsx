import "./closeFriend.css";
import React from 'react'
import ReactDOM from 'react-dom'


export default function CloseFriend({user}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  // console.log(user)

  
 
  return (
    <li className="sidebar-friend-list-item">
        <a className="sidebar-friend-link" href={`/profile/${user.username}`}>
          <img src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.png"} alt="" className="sidebar-friend-img" />
          <span className="sidebar-friend-name" >{user.username}</span>
        </a>
    </li>
  )
}
