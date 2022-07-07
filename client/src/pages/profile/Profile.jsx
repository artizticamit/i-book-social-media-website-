import "./profile.css";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";

export default function Profile() {
  return (
    <>
        <Topbar />
        <div className="home-container">
          <Sidebar />
        </div>
    </>
  )
}
