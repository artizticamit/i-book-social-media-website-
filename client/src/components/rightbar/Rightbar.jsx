import "./rightbar.css"
import { Users } from "../../dummyData"
import OnlineUsers from "../onlineUsers/OnlineUsers"
import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Add, Remove } from "@mui/icons-material"



export default function Rightbar({ user, username }) {

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [userData, setUserData] = useState({});


  const [friends, setFriends] = React.useState([]);
  const [followed, setFollowed] = React.useState(currentUser.followings.includes(userData._id));
  // const [followtext, setFollowtext] = React.useState(currentUser.followings.includes(userData._id) ? "Unfollow" : "Follow");


  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get('http://localhost:8000/api/user?username=' + username);
      console.log("getuser ka data= ", res.data)
      setUserData(res.data);
    }
    getUser();
  }, [])

  useEffect(() => {
    const getFriends = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/user/friends/" + userData._id)
        setFriends(res.data)
        console.log("username jiska hai uske friends ka data = ", res.data)

      } catch (err) {
        console.log(err)
      }
    }
    getFriends();
  }, [userData._id])

  useEffect(() => {
    setFollowed(currentUser.followings.includes(userData._id))
    // setFollowtext(currentUser.followings.includes(userData._id) ? "Unfollow" : "Follow")
    // console
    console.log(currentUser.followings.includes(userData._id))
  }, [currentUser, userData._id])

  console.log("user profile = ", currentUser)
  console.log("jiska profile ham dekh rahe hai = ", username)

  const handleFollow = async (e) => {

    try {
      if (followed) {
        await axios.put("http://localhost:8000/api/user/" + userData._id + "/unfollow", { userId: currentUser._id })
        // setFollowtext("Follow")
        dispatch({ type: "UNFOLLOW", payload: userData._id })
      } else {
        await axios.put("http://localhost:8000/api/user/" + userData._id + "/follow", { userId: currentUser._id })
        // setFollowtext("Unfollow")
        dispatch({ type: "FOLLOW", payload: userData._id })
      }
      // window.location.reload();
    } catch (err) {
      console.log(err)
    }
    setFollowed(!followed)
    // setFollowed(!followed)

  }


  const UserFriends = ({ friend }) => {
    return (
      <>
        <div className="rightbar-followings">
          <div className="rightbar-following">
            <img src={friend.profilePicture ? PF + friend.profilePicture : PF + "person/noAvatar.png"} alt="" className="rightbar-following-img" />
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
        {userData.username !== currentUser.username && (
          <button className="rightbar-follow-btn" onClick={handleFollow}>
            {currentUser.followings.includes(userData._id) ? "Unfollow" : "Follow"}
          </button>
        )}
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
          {friends.map(friend => {
            return <a href={'/profile/' + friend.username} key={friend._id}><UserFriends key={friend._id} friend={friend} /></a>
          })}

        </div>
      </>
    )
  }

  return (
    <div className="rightbar-container">
      <div className="rightbar-wrapper">
        {username ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  )
}
