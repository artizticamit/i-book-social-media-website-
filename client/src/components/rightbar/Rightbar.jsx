import "./rightbar.css"
import { Users } from "../../dummyData"
import OnlineUsers from "../onlineUsers/OnlineUsers"
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"



export default function Rightbar({ user }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = React.useState([]);
  useEffect(()=>{
    const getFriends = async()=>{
      try{
        const res = await axios.get("http://localhost:8000/api/user/friends/"+user._id)
        setFriends(res.data)
        console.log(res.data)

      }catch(err){
        console.log(err)
      }
    }
    getFriends();
  },[user._id])


  const UserFriends = ({friend})=>{
    return(
      <>
          <div className="rightbar-followings">
            <div className="rightbar-following">
              <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png"} alt="" className="rightbar-following-img" />
              <span className="rightbar-following-name">{friend.username}</span>
            </div>
          </div>
      </>
    )
  }

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
            {friends.map(friend=>{
              return <UserFriends key={friend._id} friend={friend} />
            })}
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
