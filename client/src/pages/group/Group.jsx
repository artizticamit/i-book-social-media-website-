import React, { useEffect, useState } from 'react'
import './group.css'
import Topbar from '../../components/topbar/Topbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import GroupCard from '../../components/groupCard/GroupCard'


function Group() {
  const path = 'https://i-book-backend.onrender.com'

  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [groupList, setGroupList] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [groupDesc, setGroupDesc] = useState("")
  const [render, setRender] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState(null)
  

  useEffect(() => {
    const fetchGroups = async () => {
      if (currentUser) {
        const res = await axios.get(`${path}/api/group/groups/` + currentUser._id)
        setGroupList(res.data);
        console.log(res.data)
      }
    }
    fetchGroups();
  }, [currentUser, render])

  const toggleForm = () => {
    setShowForm(!showForm);
  }

  const handleForm = async()=>{
    try{
      if(currentUser)
      {
        await axios.post(`${path}/api/group`, {name:groupName, desc:groupDesc, admin:currentUser._id})
        setRender(!render);
      }
    }catch(err)
    {
      console.log(err)
    }
    setShowForm(!showForm)
  }

  const handleSearch = async()=>{
    try{
      const res = await axios.get(`${path}/api/group/`+searchInput)
      setSearchData(res.data)
      console.log(res.data)
    }catch(err)
    {
      console.log(err);
    }
  }

  return (
    <>
    {showForm &&
            <div className="group-create-form">
              <div className="overlay" onClick={toggleForm}></div>
              <div className="group-create-form-container">
                <div className="form">
                  <div className="group-form-name">
                    <label htmlFor="name">Name</label>
                    <input name='name' type="text" placeholder='Name' value={groupName} onChange={(e)=>{setGroupName(e.target.value)}}/>
                  </div>
                  <div className="group-form-desc">
                    <label htmlFor="desc">Description</label>
                    <input type="text" name="desc" id="" placeholder='Description' value={groupDesc} onChange={(e)=>{setGroupDesc(e.target.value)}}/>
                  </div>
                  <button onClick={handleForm}>submit</button>
                </div>
                <button className='overlay-close' onClick={toggleForm}>Close</button>
              </div>
            </div>
    }
      {currentUser && <Topbar />}
      <div className="group-container">
        <Sidebar />
        <div className="group-page">
          <div className="group-card-wrapper">
            <div className="group-header">
              <h1>Groups</h1>
              <div className="group-search">
                <input type="text" value={searchInput}  name="" id=""  placeholder='Search: Enter group ID' className='group-search-input' onChange={(e)=>{setSearchInput(e.target.value)}}/>
                <input type="submit" onClick={handleSearch} value="Search" className='group-search-btn'/>
              </div>
              <div className="group-create" onClick={toggleForm}>Create Group</div>
            </div>
          </div>

          {searchData&&
            <div className="group-search-list-container">
            <div>Searched Data</div>
              <GroupCard group={searchData} />
              <hr className='mg-t-30' />
            </div>
          }
          <div>My groups</div>
          {groupList && groupList.map((group) => {
            return (
              <GroupCard key={group._id} group={group} />
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Group