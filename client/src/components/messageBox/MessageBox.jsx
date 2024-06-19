import './messageBox.css'
import React from 'react'
import { Close } from '@mui/icons-material';

function MessageBox({friendData, setClicked}) {
  return (
    <div className='messagebox-container'>
        <div className="show-user">
            <div className="user">{friendData.username}</div>
            <div className="close-btn-message-box">
                <Close onClick={()=>{setClicked(null)}}/>
            </div>
        </div>
        <div className="chatting-box"></div>
        <div className="message-input"></div>
    </div>
  )
}

export default MessageBox