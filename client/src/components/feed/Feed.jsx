import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import {Posts} from "../../dummyData"
import React from "react";
import ReactDOM from 'react-dom'

import {useState, useEffect} from "react";
import axios from "axios";
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"

export default function Feed(props) {

  const [posts, setPosts] = React.useState([]); 
  
  const {user} = useContext(AuthContext);


  useEffect(()=>{
    // setUserid(props.userid);
    // console.log("feed = ",props.userid)
    const fetchPosts = async () => {
      const res = props.username
      ? await axios.get("http://localhost:8000/api/posts/profile/"+props.username)
      : await axios.get(`http://localhost:8000/api/posts/timeline/${user._id}`)
      
      console.log(res);
      setPosts(res.data);
      // example user id : 61ecdc3e19c3ac8008b995ce
      // console.log(res);
    }
    fetchPosts();
    console.log("feed = ",posts)
  }, [props.username, user._id])

  return (
    <div className="feed-container">
      <div className="feed-wrapper">
        <Share username={props.username}/>
        {/* <div>Total posts = {posts.length}</div> */}
        {posts && posts.map((p)=>(
          <Post key={p._id} post={p}/>
        ))}
        
      </div>
    </div>
  )
}
