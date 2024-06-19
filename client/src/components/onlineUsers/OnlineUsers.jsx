import React from 'react'

export default function OnlineUsers({user, handleClick}) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleUserClick = ()=>{
    handleClick(user);
  }
  return (
    <div className="online-users-container" onClick={handleUserClick}>
        <div className="online-friends-list">
            <div className="online-friend">
              <img src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.png"} alt="" className="friend-profile-pic" />
              <span className="img-highlight-green"></span>
              <span className="friend-name">{user.username}</span>
            </div>
        </div>
    </div>
  )
}
