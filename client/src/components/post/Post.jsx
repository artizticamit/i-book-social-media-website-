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



export default function ({post, handleDeletePost}) {
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

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [showmenu, setShowmenu] = useState(false);
  const [selectedvalue, setSelectedvalue] = useState(null);

  const [showComments, setShowComments] = useState(false);
  const [commentData, setCommentData] = useState("");

  const {user:currentUser} = useContext(AuthContext);
  const [isDeleted, setIsDeleted] = useState(false);
  const [comments, setComments] = useState(post.comments || []);
  const [isSaved, setIsSaved] = useState(currentUser&&post&& currentUser.savedPosts.includes(post._id));

  const postRef = useRef(null);


  // for checking if the current post is inside the saved lists of post of the current user
  // Check if the post is saved or not on component load
  useEffect(() => {
    const checkPostSaved = async () => {
      try {
        const response = await axios.get(
          `http://192.168.1.7:8000/api/posts/${post._id}/issaved/${currentUser._id}`
        );
        setIsSaved(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    checkPostSaved();
  }, [post._id, currentUser._id]);


  // this os for fetching userdetails
  useEffect(()=>{
    const fetchUsers = async ()=>{
      const response = await axios.get(`http://192.168.1.7:8000/api/user?userId=${post.userId}`)
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
      await axios.put("http://192.168.1.7:8000/api/posts/"+post._id+"/like", {userId: currentUser._id})
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
      handlePostDelete();
    } else if (option.value === "edit") {
      // Handle edit option
    } else if (option.value === "save" || option.value==="unsave") {
      // Handle save option
      handleSavePost();
      setIsSaved(!isSaved);
    }
    console.log(option.value);
    setShowmenu(!showmenu);
  };

  // useEffect(()=>{
  //     setComments(post.comments);
  //     console.log("comments = ", comments)
  // },[post])


  // this is use for shwowing comments on clicking .
  const handleShowComments = ()=>{
    setShowComments(!showComments)
  }

  // comment giving it to backend.
  const handleComment = async()=>{
    try{
      if(post._id && currentUser)
      {
        if(commentData!=="")
        {

          const res = await axios.put('http://192.168.1.7:8000/api/posts/comment/'+post._id, {username:currentUser.username, comment:commentData})
          // console.log(res);
          setComments([...comments,res.data]);
          setCommentData("");
        }
      }
    }catch(err)
    {
      console.log(err);
    }
  }

  useEffect(() => {
    // Set options based on user role
    const updatedOptions = []
    if (user && currentUser && user._id === currentUser._id) {
      updatedOptions.push({value:"delete",label:"Delete"})
      updatedOptions.push({value:"edit",label:"Edit"})
    }
    if(isSaved)
    {
      updatedOptions.push({value:"unsave",label:"Unsave"})
    }
    else{
      updatedOptions.push({value:"save",label:"Save"})  
    }
    setOptions(updatedOptions)
  }, [currentUser, user, isSaved]);

  useEffect(() => {
    // Close menu when clicking outside of it
    const handleClickOutside = (event) => {
      if (postRef.current && !postRef.current.contains(event.target)) {
        setShowmenu(false);
        setShowComments(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handlePostDelete =async ()=>{
    const confirmDelete = window.confirm("Are you sure you want to delete this post?")

    if(confirmDelete)
    {
      try{
        if(currentUser._id==post.userId)
        {
          const res = await axios.delete(`http://192.168.1.7:8000/api/posts/${post._id}?userId=${currentUser._id}`)
          setIsDeleted(true);
          handleDeletePost(post._id);
          console.log(res.data);
        }
        
      }catch(err){
        console.log(err);
      }
    }
  }

  if(isDeleted)
  {
    return null;
  }


  const handleSavePost = async()=>{
    try{
      if(currentUser && post)
      {
        let res;
        if(isSaved)
        {
          //unsave the post
          res = await axios.post(`http://192.168.1.7:8000/api/posts/${post._id}/unsave`, {userId:currentUser._id})
          setIsSaved(false);
        }
        else{
          //save the post
          res = await axios.post(`http://192.168.1.7:8000/api/posts/${post._id}/save`, {userId:currentUser._id})
          setIsSaved(true);
        }
        // const res = await axios.post('http://localhost:8000/api/posts/savepost/'+currentUser._id, {postId:post._id})
        // handleSavedPost(post._id);
        window.alert(res.data)
        console.log(res.data)
      }
    }catch(err)
    {
      console.log(err.message);
      window.alert(err.response.data)
    }
  }
  
  return (
    <div className="post-container">
        <div className="post-wrapper" ref={postRef}>
          <div className="post-top">
            <div className="post-top-left">
            <a href={`/profile/${user.username}`} style={{textDecoration:"none", color:"black", display:"flex", alignItems:"center"}}>
              <img src={user.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.png"} alt="" className="post-profile-pic" loading="lazy" />
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
              <input type="text" className="comment-input" autoFocus value={commentData} onChange={(e)=>{setCommentData(e.target.value)}} placeholder="Write Comment"/>
              <button className="comment-btn-submit" onClick={handleComment}>Post</button>
            </div>
              {comments.map((comment)=>(
                    <Comments comment={comment} key={comment.username+ comment.comment}/>
                  ))}
          </div>
          }
        </div>
    </div>
  )
}
