import "./share.css"
import {PermMedia, Label, EmojiEmotions, Room} from "@mui/icons-material"
import React from 'react'
import ReactDOM from 'react-dom'
import axios from "axios";
import {useState, useEffect} from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {useRef} from "react";
import { Cancel } from "@mui/icons-material";
import IosShareIcon from '@mui/icons-material/IosShare';


export default function Share() {

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const path = 'https://i-book-backend.onrender.com'

    const {user:currentUser} = useContext(AuthContext);

    const desc = useRef();

    const [file, setFile] = useState(null);
    const [shareButtonText, setShareButtonText] = useState("Share");

    const submitHandle = async (e)=>{
        e.preventDefault();
       
        if(desc.current.value=="" && !file)
        {
            return;
        }
        const newPost = {
            userId : currentUser._id,
            desc : desc.current.value
        };

        if(file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.img = fileName;
            console.log(newPost)
            try{
                await axios.post(`${path}/api/upload`, data)

            }catch(err){}
        }

        try{
            await axios.post(`${path}/api/posts`, newPost)
            window.location.reload();
        }
        catch(err){
            console.log(err)
        }
        desc.current.value=""
    }

    useEffect(() => {
        const handleResize = () => {
          if (window.innerWidth <= 650) {
            setShareButtonText("");
          } else {
            setShareButtonText("Share");
          }
        };
    
        handleResize(); // Initial call to set initial state
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

  return (
    <div className="share-container">
        <div className="share-wrapper">
            <div className="share-top">
                <img className="share-profile-pic" src={currentUser.profilePicture?PF+currentUser.profilePicture:PF+"person/noAvatar.png"} alt="" />
                <input type="text" className="share-input" placeholder={"What's in your mind "+currentUser.username+" ?"} ref={desc}/>
            </div>
            <hr className="share-hr"/>
            {
                file &&(
                    <div className="share-img-container">
                        <img className="share-img" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="share-cancel-img" onClick={()=>setFile(null)}/>
                    </div>
                )
            }
            <form className="share-bottom" onSubmit={submitHandle}>
                <div className="share-options">
                    <label htmlFor="file" className="share-option">
                        <PermMedia htmlColor="tomato" className="share-icon"/>
                        <span className="share-option-text">
                            Photo or Video
                        </span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg, .jpg" onChange={(e)=>setFile(e.target.files[0])}/>
                    </label>
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
                {
                    shareButtonText === "" ? <IosShareIcon />:<button className="share-btn" type="submit">{shareButtonText}</button>
                }
                
            </form>
        </div>
    </div>
  )
}
