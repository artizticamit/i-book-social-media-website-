import "./post.css"
import {MoreVert} from "@mui/icons-material"

export default function () {
  return (
    <div className="post-container">
        <div className="post-wrapper">
          <div className="post-top">
            <div className="post-top-left">
              <img src="./assets/person/1.jpeg" alt="" className="post-profile-pic" />
              <span className="post-username">Antonio Gala</span>
              <span className="post-timelapse" >5 mins ago </span>

            </div>
            <div className="post-top-right">
              <MoreVert />
            </div>
          </div>
          <div className="post-center">
            <span className="post-center-text">Hello there!</span>
            <img src="./assets/post/1.jpeg" alt="" className="post-center-img" />
          </div>
          <div className="post-bottom">
            <div className="post-bottom-left">
              <div className="post-likes">
                <img  src="./assets/like.png" alt="" className="post-like-icon" />
                <img  src="./assets/heart.png" alt="" className="post-like-icon" />
                <span className="post-likes-counter">32 likes</span>
              </div>
            </div>
            <div className="post-bottom-right">
              9 comments
            </div>
          </div>
        </div>
    </div>
  )
}
