import "./sidebar.css"
import {Home, Explore, Star, LocalFireDepartment, Group} from "@mui/icons-material"

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebarWrapper">
        <ul className="sidebar-list">
          <li className="sidebar-list-item">
            <Home className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Home
            </span>
          </li>
          <li className="sidebar-list-item">
            <Explore className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Explore
            </span>
          </li>
          <li className="sidebar-list-item">
            <Star className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Popular
            </span>
          </li>
          <li className="sidebar-list-item">
            <LocalFireDepartment className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Hot Posts
            </span>
          </li>
          <li className="sidebar-list-item">
            <Group className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Group
            </span>
          </li>
          <li className="sidebar-list-item">
            <Group className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Group
            </span>
          </li>
          <li className="sidebar-list-item">
            <Group className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Group
            </span>
          </li>
          <li className="sidebar-list-item">
            <Group className="sidebar-list-icon"/>
            <span className="sidebar-list-item-text">
              Group
            </span>
          </li>
        </ul>
        <button className="sidebar-show-more-btn">Show More</button>
        <hr className="sidebar-hr" />
        <ul className="sidebar-friend-list">
          <li className="sidebar-friend-list-item">
            <img src="./assets/person/4.jpeg" alt="" className="sidebar-friend-img" />
            <span className="sidebar-friedn-name">Arya Stark</span>
          </li>
          <li className="sidebar-friend-list-item">
            <img src="./assets/person/4.jpeg" alt="" className="sidebar-friend-img" />
            <span className="sidebar-friedn-name">Arya Stark</span>
          </li>
          <li className="sidebar-friend-list-item">
            <img src="./assets/person/4.jpeg" alt="" className="sidebar-friend-img" />
            <span className="sidebar-friedn-name">Arya Stark</span>
          </li>
          <li className="sidebar-friend-list-item">
            <img src="./assets/person/4.jpeg" alt="" className="sidebar-friend-img" />
            <span className="sidebar-friedn-name">Arya Stark</span>
          </li>
          <li className="sidebar-friend-list-item">
            <img src="./assets/person/4.jpeg" alt="" className="sidebar-friend-img" />
            <span className="sidebar-friedn-name">Arya Stark</span>
          </li>
          <li className="sidebar-friend-list-item">
            <img src="./assets/person/4.jpeg" alt="" className="sidebar-friend-img" />
            <span className="sidebar-friedn-name">Arya Stark</span>
          </li>
          <li className="sidebar-friend-list-item">
            <img src="./assets/person/4.jpeg" alt="" className="sidebar-friend-img" />
            <span className="sidebar-friedn-name">Arya Stark</span>
          </li>
          
        </ul>
      </div>
      
    </div>
  )
}
