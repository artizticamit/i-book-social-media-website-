import "./post.css"
import {MoreVert} from "@mui/icons-material"
import {Users} from "../../dummyData"
import { useState, useEffect } from "react";
import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import {format} from "timeago.js"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";



export default function ({post}) {
  // console.log(post)
  // const user = Users.filter((u)=> u.id === post.userId );
  // if(user.length>0)console.log(user[0].username);
  // user.map((u)=> console.log(u));

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});

  const {user:currentUser} = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    const fetchUsers = async ()=>{
      const response = await axios.get(`http://localhost:8000/api/user?userId=${post.userId}`)
      setUser(response.data)
      console.log(response)
      
    }
    fetchUsers();
    console.log("post =",user)
  }, [post.userId])


  const likeHandler = ()=>{
    // first we have to fetch the post and check if the current user have liked the post or not and handle tha case.

    try{
      axios.put("http://localhost:8000/api/posts/"+post._id+"/like", {userId: currentUser._id})
    }
    catch(err){
      console.log(err)
    }

    setLike(isLiked ? like-1 : like+1);
    setIsLiked(isLiked? false : true);
  }

  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))

  },[currentUser._id, post.likes])
  
  return (
    <div className="post-container">
        <div className="post-wrapper">
          <div className="post-top">
            <div className="post-top-left">
            <a href={`/profile/${user.username}`} style={{textDecoration:"none", color:"black", display:"flex", alignItems:"center"}}>
              <img src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.png"} alt="" className="post-profile-pic" />
              <span className="post-username">{user.username}</span>
            </a>
              <span className="post-timelapse" >{format(post.createdAt)}</span>

            </div>
            <div className="post-top-right">
              <MoreVert />
            </div>
          </div>
          <div className="post-center">
            <span className="post-center-text">{post.desc}</span>
            <img src={PF+post.img} alt="" className="post-center-img" />
          </div>
          <div className="post-bottom">
            <div className="post-bottom-left">
              <div className="post-likes">
                <img  src="/assets/like.png" alt="" className="post-like-icon" onClick={likeHandler} />
                <img  src="/assets/heart.png" alt="" className="post-like-icon" onClick={likeHandler} />
                <span className="post-likes-counter">{like} people like this.</span>
              </div>
            </div>
            <div className="post-bottom-right">
             {post.comment} comments
            </div>
          </div>
        </div>
    </div>
  )
}
