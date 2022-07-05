import "./rightbar.css"
import { Users } from "../../dummyData"
import OnlineUsers from "../onlineUsers/OnlineUsers"

export default function Rightbar() {
  return (
    <div className="rightbar-container">
      <div className="rightbar-wrapper">
        <div className="rightbar-top">
          <div className="popular-content">
            <span className="rightbar-content-text">This is the popular content on going.</span>
            <img src="./assets/post/6.jpeg" alt="" className="rightbar-top-img" />
            <span className="rightbar-top-popular-content-hashtags">#cat #asthetic</span>
          </div>
        </div>
        <div className="rightbar-bottom">
          <div className="online-friends-heading">Online Friends</div>
          {Users.map((u)=>(
            <OnlineUsers key={u.id} user={u} />
          ))}
        </div>
      </div>
    </div>
  )
}
