import React from 'react'
import "./loading.css"

export default function Loading() {
  return (
    <>
    <div className="loading-container">

        <h1 className="loading-header">
            Loading
            <span className="loading-first-dot">.</span>
            <span className="loading-second-dot">.</span>
            <span className="loading-third-dot">.</span>
        </h1>
    </div>
    </>
  )
}
