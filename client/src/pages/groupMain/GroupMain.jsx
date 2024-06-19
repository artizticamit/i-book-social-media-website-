import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import './groupMain.css'
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';
import GroupMembers from '../../components/groupMembers/GroupMembers';
import Topbar from '../../components/topbar/Topbar';

function GroupMain() {
    const path = 'https://i-book-backend.onrender.com'
    const PATH = process.env.REACT_APP_PATH_TO_BACKEND || 'http://localhost:8000'

    const groupId = useParams().groupId;
    const [groupData, setGroupData] = useState(null)
    const [groupLeaveStatus, setGroupLeaveStatus] = useState("")
    const {user:currentUser, dispatch} = useContext(AuthContext)
    const [adminData, setAdminData] = useState(null)
    const [membersList, setMembersList] = useState(null)


    useEffect(()=>{
        try{

            const fetchGroupData = async()=>{
                if(groupId)
                {
                    const res = await axios.get(`${PATH}/api/group/`+groupId);
                    setGroupData(res.data);
                    console.log(res.data);
                }
            }
            fetchGroupData()

        }catch(err)
        {
            console.log(err);
        }
    },[groupId])

    useEffect(()=>{
        if(currentUser&&groupId)
        {
            // console.log(currentUser.groups)
            // console.log(groupId)
            if(currentUser.groups.includes(groupId))
            {
                setGroupLeaveStatus("Leave");
            }
            else{
                setGroupLeaveStatus("Join");
            }
        }
    },[currentUser, groupId])

    useEffect(()=>{
        try{

            const fetchAdminData = async()=>{
                if(groupData){
                    const adminId = groupData.admin
                    const res = await axios.get(`${PATH}/api/user/?userId=`+adminId)
                    setAdminData(res.data);
    
                }
            }

            fetchAdminData();
        }catch(err){
            console.log(err)
        }
    },[groupData])

    useEffect(()=>{
        try{
            const fetchMembersList = async()=>{
                if(groupData && adminData)
                {
                    const res = await axios.get(`${PATH}/api/group/`+groupData._id+`/members`)
                    // setMembersList(res.data);
                    setMembersList(res.data.filter(user=> user._id!==adminData._id))
                    console.log(membersList)
                }
            }
            fetchMembersList();
        }catch(err){
            console.log(err)
        }
    },[groupData, adminData])


    const handleJoinLeave = async()=>{
        console.log(groupLeaveStatus)
        if(groupLeaveStatus==="Join")
        {
            try{
                if(groupData && currentUser)
                {
                    const res = await axios.put(`${PATH}/api/group/`+groupData._id+`/join`, {userId:currentUser._id})
                    console.log(groupData._id)
                    dispatch({type:'JOIN_GROUP', payload:groupData._id})
                    // console.log(currentUser)
                    // localStorage.setItem('user', JSON.stringify(currentUser))
                    setGroupLeaveStatus("Leave")
                    // window.location.reload()
                    // updateUser(res.data)
                }
            }catch(err)
            {
                console.log(err)
            }
        }
        else{
            try{
                if(groupData && currentUser)
                {
                    const res = await axios.put(`${PATH}/api/group/`+groupData._id+`/leave`, {userId:currentUser._id})
                    setGroupLeaveStatus("Join")
                }
                
            }catch(err)
            {
                console.log(err)
            }
        }
    }

  return (
    <>
    {currentUser && <Topbar />}
    <div className="groupmain-container">
        <div className="groupmain-header">
            <div className="group-header-name-container">
                <div className='group-header-name'>{groupData&&groupData.name}</div>
                <span className='group-header-groupId'>{groupData && groupData._id}</span>
                <div className="groupmain-header-desc">{groupData&&groupData.desc}</div>
            </div>
            <div className="groupmain-header-join-container">
                <button className='groupmain-header-join-btn' onClick={handleJoinLeave}>{groupLeaveStatus}</button>
            </div>
        </div>
        <div className="groupmain-body">
            <div className="groupmain-posts">Post</div>
            <div className="groupmain-members-container">
                <span className='groupmain-members-text'>Members</span>
                <div className="groupmain-members-admin">
                    {adminData && adminData.username}
                </div>
                <div className="groupmain-members-list">
                {membersList&&
                    membersList.map(user=>(
                        <GroupMembers key={user._id} user={user} />
                    ))
                }
                </div>
            </div>
        </div>
        
    </div>
    </>
  )
}

export default GroupMain