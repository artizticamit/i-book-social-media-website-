import React, { useEffect } from 'react'
import './groupCard.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
// import { FlareSharp } from '@mui/icons-material';

export default function GroupCard({group}) {

  // const {user:currentUser} = useContext(AuthContext)
  // const [showJoin, setShowJoin]= useState(false);
  const navigate = useNavigate();

  

  const handleGroupClick = (groupId)=>{
    console.log(groupId);
    if(groupId)
    {
        navigate(`/group/${groupId}`);
    }
  }

  // useEffect(()=>{
  //   if(currentUser && group && currentUser.groups.includes(group._id))
  //   {
  //     setShowJoin(false);
  //   }
  //   else{
  //     setShowJoin(true);
  //   }
  // },[currentUser, group])

    return (
        <>
        <div className="group-card-search-wrapper">

                <div className="group-card-container" onClick={()=>{handleGroupClick(group._id)}}>
                {/* <FlareSharp /> */}
                    <div className="group-card-name">{group.name}</div>
                    <div className="group-card-desc">{group.desc}</div>
                </div>
                {/* {showJoin&&<div className="group-card-join">Join</div>} */}
        </div>
            
        </>
    )
}
