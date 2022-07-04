import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import {Posts} from "../../dummyData"

export default function Feed() {
  return (
    <div className="feed-container">
      <div className="feed-wrapper">
        <Share />

        {Posts.map((p)=>(
          <Post key={p.id} post={p}/>
        ))}
        
      </div>
    </div>
  )
}
