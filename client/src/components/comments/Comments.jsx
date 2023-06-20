import React, { useEffect, useState } from 'react'
import '../post/post.css'
import { AuthContext } from '../../context/AuthContext'
import { useContext } from 'react'
import axios from 'axios';

export default function Comments({comment}) {

  // const {user:currentUser}

  // I need to fetch the profile picture of the person who has commented

  const [commenter, setCommenter] = useState({});

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(()=>{
    const fetchCommenter = async()=>{
      const res = await axios.get('http://localhost:8000/api/user?username='+comment.username)
      setCommenter(res.data);
      console.log(res);
    }
    fetchCommenter();
  },[comment.username])

  return (
    <>
    <div className="comment-container">
      <img className="commenter-profilePic" src={commenter.profilePicture ? PF+commenter.profilePicture: PF+"person/noAvatar.png"} alt="" />
      <div className="comment-container2">
          <div className="comment-username">{comment.username}</div>
          <div className="comment-desc">{comment.comment}</div>
      </div>
    </div>
    </>
  )
}
