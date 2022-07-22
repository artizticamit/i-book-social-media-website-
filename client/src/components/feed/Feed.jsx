import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
// import {Posts} from "../../dummyData"
import React from "react";
// import ReactDOM from 'react-dom'

import { useState, useEffect } from "react";
import axios from "axios";

export default function Feed({ username }) {

  const [posts, setPosts] = useState([]);
  console.log("username = "+username);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = (username!=undefined ? await axios.get("http://localhost:8000/api/posts/profile/"+username): await axios.get("http://localhost:8000/api/posts/timeline/61ecdc3e19c3ac8008b995ce"));
      setPosts(res.data);
      // console.log(res);
    }
    fetchPosts();
  }, [username])

  return (
    <div className="feed-container">
      <div className="feed-wrapper">
        <Share username={username}/>

        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}

      </div>
    </div>
  )
}
