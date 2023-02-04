import "./post.css"
import {MoreVert} from "@mui/icons-material"
import {Users} from "../../dummyData"
import { useState } from "react";
import React from 'react'
import ReactDOM from 'react-dom'



export default function ({post}) {
  // console.log(post)
  const user = Users.filter((u)=> u.id === post.userId );
  // if(user.length>0)console.log(user[0].username);
  // user.map((u)=> console.log(u));

  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = ()=>{
    setLike(isLiked ? like-1 : like+1);
    setIsLiked(isLiked? false : true);
  }
  
  return (
    <div className="post-container">
        <div className="post-wrapper">
          <div className="post-top">
            <div className="post-top-left">
              <img src={"/assets/"+Users.filter((u)=> u.id === post.userId ).map((user)=>user.profilePicture)} alt="" className="post-profile-pic" />
              <span className="post-username">{Users.filter((u)=> u.id === post.userId ).map((user)=>user.username)}</span>
              <span className="post-timelapse" >{post.date}</span>

            </div>
            <div className="post-top-right">
              <MoreVert />
            </div>
          </div>
          <div className="post-center">
            <span className="post-center-text">{post.desc}</span>
            <img src={"/assets/"+post.photo} alt="" className="post-center-img" />
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
