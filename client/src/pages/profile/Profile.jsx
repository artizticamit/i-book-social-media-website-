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
            <div className="profile-right-top">Top</div>
            <div className="profile-right-bottom">
              <Feed className="profile-feed" />
              <Rightbar className="profile-rightbar" />
            </div>
          </div>
        </div>
      </>
  )
}
