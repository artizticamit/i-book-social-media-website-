import "./rightbar.css"
import { Users } from "../../dummyData"
import OnlineUsers from "../onlineUsers/OnlineUsers"
import React from 'react'
import ReactDOM from 'react-dom'
import FriendsList from "../friendsList/FriendsList"
import Loading from "../loading/Loading"


export default function Rightbar({ user }) {
  // console.log

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const HomeRightbar = () => {
    return (
      <>
        <div className="rightbar-top">
          <div className="popular-content">
            <span className="rightbar-content-text">This is the popular content on going.</span>
            <img src="./assets/post/6.jpeg" alt="" className="rightbar-top-img" />
            <span className="rightbar-top-popular-content-hashtags">#cat #asthetic</span>
          </div>
        </div>
        <div className="rightbar-bottom">
          <div className="online-friends-heading">Online Friends</div>
          {Users.map((u) => (
            <OnlineUsers key={u.id} user={u} />
          ))}
        </div>
      </>
    )
  }

  const ProfileRightbar = () => {
    console.log(user)
    return (
      <>
        <h4 className="rightbar-title">User information</h4>
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">City: </span>
            <span className="rightbar-info-value">{user.city}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">From: </span>
            <span className="rightbar-info-value">{user.from}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Relationship: </span>
            <span className="rightbar-info-value">{user.relationship}</span>
          </div>
          <h4 className="rightbar-title">User friends</h4>
          <div className="rightbar-followings">
            <div className="rightbar-following">
              {user.followings !== undefined && user.followings.map((item)=>{
                return <>
                  <div>{item}</div>
                </>
              })}
            </div>
          </div>
        </div>
      </>
      )
  }

        return (
        <div className="rightbar-container">
          <div className="rightbar-wrapper">
            {user ? <ProfileRightbar /> : <HomeRightbar />}
          </div>
        </div>
        )
}
