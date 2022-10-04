import "./profile.css";
import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Feed from "../../components/feed/Feed.jsx"
import Rightbar from "../../components/rightbar/Rightbar.jsx"
import React from "react";
import {useState, useEffect} from "react";
import axios from "axios";
import Loading from "../../components/loading/Loading";
import { useParams } from "react-router";

export default function Profile() {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [user, setUser] = useState({});
  const username = useParams().username;
  // console.log(params);
  
  useEffect(()=>{
    const fetchUser = async () => {
      console.log("inside fetchUser");
      const res = await axios.get("http://localhost:8000/api/user?username="+username);
      setUser(res.data);
      console.log(res);
    }
    fetchUser();
  }, [])

  return (
    <>
      <Topbar username={username}/>
      <div className="profile-container">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img src={PF + (user.coverPicture!==""? user.coverPicture : "coverNoavtar.jpg")} alt="" className="profile-cover-img" />
              <img src={PF+(user.profilePicture!==""?user.profilePicture: "person/noAvatar.png")} alt="" className="profile-user-img" />
            </div>
          </div>
          <div className="profile-info">
            <h4 className="profile-info-name">{user.username}</h4>
          </div>
          <div className="profile-right-bottom">
            {/* <p>{(user.username)}</p> */}
            {user.username ? <Feed username={user.username}/>: <div><Loading /></div>}
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  )
}
