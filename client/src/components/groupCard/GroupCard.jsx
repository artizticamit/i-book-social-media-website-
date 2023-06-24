import React from 'react'
import './groupCard.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function GroupCard({group}) {
    const [name, setName] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isPromptVisible, setIsPromptVisible] = useState(false);
  const navigate = useNavigate();

  const handleCreateClick = () => {
    setIsPromptVisible(true);
  };

  const handleGroupClick = (groupId)=>{
    console.log(groupId);
    if(groupId)
    {
        navigate(`/group/${groupId}`);
    }
  }

    return (
        <>
            
                
    
                <div className="group-card-container" onClick={()=>{handleGroupClick(group._id)}}>
                    <div className="group-card-name">{group.name}</div>
                    <div className="group-card-desc">{group.desc}</div>
                    <div className="group-card-join">Join</div>
                </div>
            
        </>
    )
}
