import React from 'react'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Temp() {

    const [user, setUser] = useState({});
  const username = useParams().username;
  // console.log(params);

  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get(`http://localhost:8000/api/user?username=${username}`);
      setUser(res.data);
    }
    fetchUser();
  },[username])

    const {user:currentUser} = useContext(AuthContext)

    console.log("current user = ",currentUser)

    const [followed, setFollowed] = useState(false)
    console.log("temp = ",currentUser.followings.includes(user._id))

    useEffect(()=>{
        setFollowed(currentUser.followings.includes(user._id))
    },[currentUser])

    const [text, setText] = useState(currentUser.followings.includes(user?.id)?"Unfollow":"Follow");

    const handleClick = ()=>{
        if(followed===true){
            setText("Unfollow")
        }else{
            setText("Follow")
        }
        setFollowed(!followed)
    }

  return (
    <>
        <h1>Temp</h1>
        <h2>{"the user we are visiting "+user.username}</h2>
        <h2>{"The user we are "+currentUser.username}</h2>
        <button type='submit' title='Follow or unfollow' onClick={handleClick}>{text}</button>
    </>
  )
}
