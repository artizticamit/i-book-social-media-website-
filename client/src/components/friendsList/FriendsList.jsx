import React from 'react'

export default function FriendsList() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    // console.log("data = ", data);
  return (
    <div className='rightbar-following'>
        <img src={PF + "person/1.jpeg"} alt="" className="rightbar-following-img" />
        <span className="rightbar-following-name">jamie</span>
    </div>
  )
}
