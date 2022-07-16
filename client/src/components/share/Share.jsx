import "./share.css"
import {PermMedia, Label, EmojiEmotions, Room} from "@mui/icons-material"
import React from 'react'
import ReactDOM from 'react-dom'


export default function Share() {
  return (
    <div className="share-container">
        <div className="share-wrapper">
            <div className="share-top">
                <img className="share-profile-pic" src="/assets/person/2.jpeg" alt="" />
                <input type="text" className="share-input" placeholder="What's in your mind ?"/>
            </div>
            <hr className="share-hr"/>
            <div className="share-bottom">
                <div className="share-options">
                    <div className="share-option">
                        <PermMedia htmlColor="tomato" className="share-icon"/>
                        <span className="share-option-text">
                            Photo or Video
                        </span>
                    </div>
                    <div className="share-option">
                        <Label htmlColor="blue" className="share-icon"/>
                        <span className="share-option-text">
                            Tag
                        </span>
                    </div>
                    <div className="share-option">
                        <Room htmlColor="green" className="share-icon"/>
                        <span className="share-option-text">
                            Locations
                        </span>
                    </div>
                    <div className="share-option">
                        <EmojiEmotions htmlColor="gold" className="share-icon emoji-icon"/>
                        <span className="share-option-text">
                            Emojis
                        </span>
                    </div>
                </div>
                <button className="share-btn">Share</button>
            </div>
        </div>
    </div>
  )
}
