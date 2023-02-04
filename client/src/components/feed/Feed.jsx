import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import {Posts} from "../../dummyData"
import React from "react";
import ReactDOM from 'react-dom'

import {useState, useEffect} from "react";
import axios from "axios";

export default function Feed() {

  const [posts, setPosts] = useState([]); 

  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await axios.get("http://localhost:8000/api/posts/timeline/61ecdc3e19c3ac8008b995ce");
      // console.log(res);
    }
    fetchPosts();
  }, [])

  return (
    <div className="feed-container">
      <div className="feed-wrapper">
        <Share />

        {Posts.map((p)=>(
          <Post key={p.id} post={p}/>
        ))}
        
      </div>
    </div>
  )
}
