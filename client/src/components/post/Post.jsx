import "./post.css"
import {MoreVert} from "@mui/icons-material"
import {Users} from "../../dummyData"
import { useState, useEffect, useRef } from "react";
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
  const options1 = [
    {value:"delete", label:"delete"},
    {value:"edit", label:"edit"},
    {value:"save", label:"save"},
   ]

   const options2= [
    {value:"save", label:"save"},
   ]

  const [options, setOptions] = useState(options2);
  // setOptions(options2);


  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [showmenu, setShowmenu] = useState(false);
  const [selectedvalue, setSelectedvalue] = useState(null);

  const [showComments, setShowComments] = useState(false);
  const [commentData, setCommentData] = useState("");

  const {user:currentUser} = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const postRef = useRef(null);


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

  // Option item click handler
  const handleItemClick = (option) => {
    if (option.value === "delete") {
      // Handle delete option
    } else if (option.value === "edit") {
      // Handle edit option
    } else if (option.value === "save") {
      // Handle save option
    }
    console.log(option.value);
    setShowmenu(!showmenu);
  };


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
        // console.log(res);
      }
    }catch(err)
    {
      console.log(err);
    }
  }

  useEffect(() => {
    // Set options based on user role
    if (user && currentUser && user._id === currentUser._id) {
      setOptions([
        { value: "delete", label: "Delete" },
        { value: "edit", label: "Edit" },
        { value: "save", label: "Save" },
      ]);
    } else {
      setOptions([{ value: "save", label: "Save" }]);
    }
  }, [currentUser, user]);

  useEffect(() => {
    // Close menu when clicking outside of it
    const handleClickOutside = (event) => {
      if (postRef.current && !postRef.current.contains(event.target)) {
        setShowmenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="post-container">
        <div className="post-wrapper" ref={postRef}>
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
