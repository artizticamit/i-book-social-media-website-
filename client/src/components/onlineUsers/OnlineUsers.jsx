import React from 'react'

export default function OnlineUsers({user}) {
  return (
    <div className="online-users-container">
        <div className="online-friends-list">
            <div className="online-friend">
              <img src={user.profilePicture} alt="" className="friend-profile-pic" />
              <span className="img-highlight-green"></span>
              <span className="friend-name">{user.username}</span>
            </div>
        </div>
    </div>
  )
}
