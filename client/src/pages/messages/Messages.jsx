import "./messages.css"
import axios from 'axios'
import React, {useState, useEffect, useContext} from 'react'
import { AuthContext } from "../../context/AuthContext";
import OnlineUsers from "../../components/onlineUsers/OnlineUsers";
import Topbar from "../../components/topbar/Topbar";
import { CircularProgress } from "@mui/material";
import MessageBox from "../../components/messageBox/MessageBox";

function Messages() {

  const {user:currentUser} = useContext(AuthContext);
  const [friendsList, setFriendsList] = useState([]);
  const [clicked, setClicked] = useState(null);

  const PATH = process.env.REACT_APP_PATH_TO_BACKEND;


  const fetchFriends = async()=>{
    if(currentUser){
      try{
        const friends = await axios.get(`${PATH}/api/user/friends/${currentUser._id}`);

        if(friends){
          setFriendsList(friends.data);
        }
      }catch(err){
        console.log("Error while fetching friends data ", err.message);
      }
    }
  }

  useEffect(()=>{
    fetchFriends();
  }, [currentUser])
  // console.log(friendsList);


  const handleClick = (friend)=>{
    setClicked(friend);
  }

  // console.log("Clicked",clicked);
  

  return (
    <div className='main-container'>
    <Topbar />
      <h1>Messages</h1>

      {/* TODO: need to divide into two sections  */}
      <div className='messages-container'>
        <div className={`message-box ${!clicked ? 'center-align' : ''}`}>
        {
          clicked ? (

            <MessageBox friendData={clicked} setClicked={setClicked} />
          ) : (

            <span className="message-box-text">Click on any user to start chatting</span>
          )
        }
        </div>
        <div className="friends-list">
        {
          friendsList.length>0 ? friendsList.map((friendData)=>(
            <div key={friendData._id}>
              <OnlineUsers user={friendData} handleClick={handleClick}/>
            </div>
          )) : <h2>Follow Someone up....</h2>
        }
        </div>
      </div>
    </div>
  )
}

export default Messages