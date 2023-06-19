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
import Comments from '../comments/Comments'



export default function ({post}) {
  // console.log(post)
  // const user = Users.filter((u)=> u.id === post.userId );
  // if(user.length>0)console.log(user[0].username);
  // user.map((u)=> console.log(u));

  const options = [
   {value:"delete", label:"delete"},
   {value:"edit", label:"edit"},
   {value:"save", label:"save"},
  ]


  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [showmenu, setShowmenu] = useState(false);
  const [selectedvalue, setSelectedvalue] = useState(null);

  const [showComments, setShowComments] = useState(false);
  const [commentData, setCommentData] = useState("");

  const {user:currentUser} = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  // this os for fetching userdetails
  useEffect(()=>{
    const fetchUsers = async ()=>{
      const response = await axios.get(`http://localhost:8000/api/user?userId=${post.userId}`)
      setUser(response.data)
      // console.log(response)
      
    }
    fetchUsers();
    // console.log("post =",user)
  }, [post.userId])


  // this like handler
  const likeHandler = async()=>{
    // first we have to fetch the post and check if the current user have liked the post or not and handle tha case.

    try{
      await axios.put("http://localhost:8000/api/posts/"+post._id+"/like", {userId: currentUser._id})
    }
    catch(err){
      console.log(err)
    }

    setLike(isLiked ? like-1 : like+1);
    setIsLiked(isLiked? false : true);
  }

  
  // this is for checking the like status and setting iit accordingly
  useEffect(()=>{
    setIsLiked(post.likes.includes(currentUser._id))

  },[currentUser._id, post.likes])

  // this handles the menu
  const handlePostClick = ()=>{
    setShowmenu(!showmenu)
  }

  // this handles the items value
  const handleItemClick = (option)=>{
    setSelectedvalue(option);
    setShowmenu(!showmenu)
    console.log(selectedvalue.value)
  }


  // this is use for shwowing comments on clicking .
  const handleShowComments = ()=>{
    setShowComments(!showComments)
  }

  // comment giving it to backend.
  const handleComment = async()=>{
    try{
      if(post._id && currentUser)
      {
        const res = await axios.put('http://localhost:8000/api/posts/comment/'+post._id, {username:currentUser.username, comment:commentData})
        console.log(res);
      }
    }catch(err)
    {
      console.log(err);
    }
  }
  
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
            <div className="post-top-right" onClick={handlePostClick}>
              <MoreVert />
              {showmenu && <div className="dropdown-menu">
                {options.map(option=>{
                  return <div key={option.value} onClick={()=>{handleItemClick(option)}} className="dropdown-item">{option.value}</div>
                })}
              </div>
              }
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
            <div className="post-bottom-right" onClick={handleShowComments}>
              comments
            </div>
          </div>
          {
            showComments && <div className="comment-wrapper">
            <div className="comment-handler-container">
              <input type="text" className="comment-input" value={commentData} onChange={(e)=>{setCommentData(e.target.value)}} placeholder="Write Comment"/>
              <button className="comment-btn-submit" onClick={handleComment}>Post</button>
            </div>
              {post.comments.map((comment)=>(
                    <Comments comment={comment} key={comment.username+ comment.comment}/>
                  ))}
          </div>
          }
        </div>
    </div>
  )
}
