import "./profile.css";
import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Feed from "../../components/feed/Feed.jsx"
import Rightbar from "../../components/rightbar/Rightbar.jsx"
import React from "react";
import {useState, useEffect} from "react";
import axios from "axios"
import { useParams } from "react-router";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const path = 'https://i-book-backend.onrender.com'
  const PATH = process.env.PATH || 'http://localhost:8000'

  const [user, setUser] = useState({});
  const username = useParams().username;
  const {user:currentUser} = useContext(AuthContext)
  // console.log("user dat form authcontext",currentUser);

  useEffect(()=>{
    const fetchUser = async ()=>{
      
        const res = await axios.get(`${path}/api/user?username=${username}`);
        setUser(res.data);
        console.log("profile mai milne wala data= ",res.data);
    }
    fetchUser();
  },[username])


  const handleUpload = ()=>{
    console.log("upload image prompt")
  }

  // console.log("profile = ",username, user)

  // console.log("profile = ",user.profilePicture?PF+user.profilePicture:PF+"ad.png")

  return (
    <>
      {user.username && <Topbar/>}
      <div className="profile-container">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img src={PF+user.coverPicture} alt="" className="profile-cover-img" />
              <div className="profile-img-container">
              <span className="profile-img-upload-text" onClick={handleUpload} >Upload</span>
              <img src={user.profilePicture ? PF+user.profilePicture:PF+"person/noAvatar.png"} alt="" className="profile-user-img" />
              </div>
            </div>
          </div>
          <div className="profile-info">
            <h4 className="profile-info-name">{user.username&& user.username}</h4>
          </div>
          <div className="profile-right-bottom">
            {user.username && <Feed username={username} />}
            {user.username && <Rightbar user={currentUser} username={username} />}
          </div>
        </div>
      </div>
    </>
  )
}
