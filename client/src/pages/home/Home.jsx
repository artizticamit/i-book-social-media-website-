import "./home.css"
import Topbar from '../../components/topbar/Topbar.jsx'
import Sidebar from "../../components/sidebar/Sidebar.jsx"
import Feed from "../../components/feed/Feed.jsx"
import Rightbar from "../../components/rightbar/Rightbar.jsx"
import React from "react";
import {useState, useEffect} from "react";
import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import Loading from "../../components/loading/Loading"


export default function Home() {
  const {user, isFetching, error, dispatch} = useContext(AuthContext);
  console.log(user);
  return (
      <>
        <Topbar username={user.username!==undefined?user.username:'kirito'} />
        <div className="home-container">
          <Sidebar />
          <Feed username={user.username}/>
          <Rightbar />
        </div>
      </>
  )
}
