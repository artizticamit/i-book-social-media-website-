import "./post.css"
import {MoreVert} from "@mui/icons-material"
import {Users} from "../../dummyData"

export default function ({post}) {
  // console.log(post)
  const user = Users.filter((u)=> u.id === post.userId );
  // if(user.length>0)console.log(user[0].username);
  user.map((u)=> console.log(u));
  
  return (
    <div className="post-container">
        <div className="post-wrapper">
          <div className="post-top">
            <div className="post-top-left">
              <img src={Users.filter((u)=> u.id === post.userId ).map((user)=>user.profilePicture)} alt="" className="post-profile-pic" />
              <span className="post-username">{Users.filter((u)=> u.id === post.userId ).map((user)=>user.username)}</span>
              <span className="post-timelapse" >{post.date}</span>

            </div>
            <div className="post-top-right">
              <MoreVert />
            </div>
          </div>
          <div className="post-center">
            <span className="post-center-text">{post?.desc}</span>  
            <img src={post.photo} alt="" className="post-center-img" />
          </div>
          <div className="post-bottom">
            <div className="post-bottom-left">
              <div className="post-likes">
                <img  src="./assets/like.png" alt="" className="post-like-icon" />
                <img  src="./assets/heart.png" alt="" className="post-like-icon" />
                <span className="post-likes-counter">{post.like} people like this.</span>
              </div>
            </div>
            <div className="post-bottom-right">
             {post.comment} comments
            </div>
          </div>
        </div>
    </div>
  )
}
