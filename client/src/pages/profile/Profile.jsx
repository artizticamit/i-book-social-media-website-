import "./profile.css";
import Topbar from "../../components/topbar/Topbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Feed from "../../components/feed/Feed.jsx"
import Rightbar from "../../components/rightbar/Rightbar.jsx"

export default function Profile() {
  return (
    <>
      <Topbar />
      <div className="profile-container">
        <Sidebar />
        <div className="profile-right">
          <div className="profile-right-top">
            <div className="profile-cover">
              <img src="./assets/post/9.jpeg" alt="" className="profile-cover-img" />
              <img src="./assets/person/10.jpeg" alt="" className="profile-user-img" />
            </div>
          </div>
          <div className="profile-info">
            <h4 className="profile-info-name">Cersei Baratheon</h4>
          </div>
          <div className="profile-right-bottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  )
}
