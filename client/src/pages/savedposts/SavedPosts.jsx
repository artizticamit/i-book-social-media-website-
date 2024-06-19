import React from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useContext,useState,useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar'
import './savedposts.css'

import Post from '../../components/post/Post'
import axios from 'axios'

export default function SavedPosts() {
    // const path = 'https://i-book-backend.onrender.com'
    const PATH = process.env.REACT_APP_PATH_TO_BACKEND || 'http://localhost:8000'
    const {user:currentUser} = useContext(AuthContext)
    const userId = useParams().userId
    // console.log(currentUser)
    const navigate = useNavigate();

    const [posts, setPosts] = useState([])

    if(currentUser&&userId!==currentUser._id)
    {
        navigate('/');
    }

    useEffect(()=>{
        const fetchSavedposts = async()=>{
            if(currentUser)
            {
                const res = await axios.get(`${PATH}/api/posts/savedposts/${currentUser._id}`)
                setPosts(res.data);
                console.log(res.data);
            }
        }

        fetchSavedposts();
    },[currentUser])


    const handleDeletePost = (postId)=>{
        setPosts(posts.filter((post)=>post._id!==postId))
      }

  return (
    <>
        <div>SavedPosts</div>
        <div className="savedposts-container">
            <Sidebar />
            <div>
                {posts && posts.map((post)=>{
                return <Post key={post._id} post={post} handleDeletePost={handleDeletePost}/>
                })}
                {
                    !posts && <div className="text">No saved posts</div>
                }
            </div>
        </div>
    </>
  )
}
