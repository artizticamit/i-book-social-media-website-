import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"

export default function Feed() {
  return (
    <div className="feed-container">
      <div className="feed-wrapper">
        <Share />
        <Post />
      </div>
    </div>
  )
}
