import React from 'react'

export default function GroupMembers({user}) {
  return (
    <>
        <div className="groupmembers-container">
            <div className="groupmembers-name">{user.username}</div>
        </div>
    </>
  )
}
