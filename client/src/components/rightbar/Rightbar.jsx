import "./rightbar.css"
import { Users } from "../../dummyData"
import OnlineUsers from "../onlineUsers/OnlineUsers"
import React from 'react'
import ReactDOM from 'react-dom'


export default function Rightbar({ user }) {

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
    return (
      <>
        <h4 className="rightbar-title">User information</h4>
        <div className="rightbar-info">
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">City: </span>
            <span className="rightbar-info-value">{user.city || "NA"}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">From: </span>
            <span className="rightbar-info-value">{user.from || "NA"}</span>
          </div>
          <div className="rightbar-info-item">
            <span className="rightbar-info-key">Relationship: </span>
            <span className="rightbar-info-value">{user.relationship || "NA"}</span>
          </div>
          <h4 className="rightbar-title">User friends</h4>
          <div className="rightbar-followings">
            <div className="rightbar-following">
              <img src="/assets/person/1.jpeg" alt="" className="rightbar-following-img" />
              <span className="rightbar-following-name">jamie</span>
            </div>
            <div className="rightbar-following">
              <img src="/assets/person/2.jpeg" alt="" className="rightbar-following-img" />
              <span className="rightbar-following-name">frey</span>
            </div>
            <div className="rightbar-following">
              <img src="/assets/person/3.jpeg" alt="" className="rightbar-following-img" />
              <span className="rightbar-following-name">walda</span>
            </div>
            <div className="rightbar-following">
              <img src="/assets/person/4.jpeg" alt="" className="rightbar-following-img" />
              <span className="rightbar-following-name">walda</span>
            </div>
            <div className="rightbar-following">
              <img src="/assets/person/5.jpeg" alt="" className="rightbar-following-img" />
              <span className="rightbar-following-name">walda</span>
            </div>
            <div className="rightbar-following">
              <img src="/assets/person/6.jpeg" alt="" className="rightbar-following-img" />
              <span className="rightbar-following-name">walda</span>
            </div>
            <div className="rightbar-following">
              <img src="/assets/person/7.jpeg" alt="" className="rightbar-following-img" />
              <span className="rightbar-following-name">walda</span>
            </div>
            <div className="rightbar-following">
              <img src="/assets/person/8.jpeg" alt="" className="rightbar-following-img" />
              <span className="rightbar-following-name">walda</span>
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
