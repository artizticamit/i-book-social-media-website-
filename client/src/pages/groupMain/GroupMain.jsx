import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios';
import './groupMain.css'

function GroupMain() {

    const groupId = useParams().groupId;
    const [groupData, setGroupData] = useState(null)

    useEffect(()=>{
        try{

            const fetchGroupData = async()=>{
                if(groupId)
                {
                    const res = await axios.get('http://localhost:8000/api/group/'+groupId);
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

  return (
    <>
    <div className="groupmain-container">
        <div className="groupmain-header">
            <h1>{groupData&&groupData.name}</h1>
            <div className="groupmain-header-desc">{groupData&&groupData.desc}</div>
        </div>
        <div className="groupmain-body">
            <div className="groupmain-posts">Post</div>
            <div className="groupmain-members">
                Members List
            </div>
        </div>
        
    </div>
    </>
  )
}

export default GroupMain