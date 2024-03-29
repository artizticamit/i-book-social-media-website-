const { json } = require("express");
const Post = require("../models/Post");
const User = require("../models/User");
const { default: mongoose } = require("mongoose");

// Create a post
const createPostHandler = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Update's a post
const updatePostHandler = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json("the post has been updated");
    } else {
      res.status(403).json("You can update only your post");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


// Delete's a post
const deletePostHandler = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    console.log(post);
    console.log(req.query);
    if (post.userId.toString() === req.query.userId) {
      await post.deleteOne({ $set: req.query });
      res.status(200).json("the post has been deleted");
    } else {
      res.status(403).json("You can delete only your post");
    }
    // res.status(200).json('ok delete');
  } catch (err) {
    res.status(500).json(err);
  }
};

// Like's a post
const likeHandler = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json("The post has been liked");
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json("The post has been disliked");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

// Get a post
const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json("Post not found");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};


// Get timeline posts
const getTimeline = async (req, res) => {
  try {
    const currentUser = await User.findById(req.params.userId);
    // console.log(currentUser);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );

    res.status(200).json(userPosts.concat(...friendPosts));
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};

// Get user's all posts
const getUserPosts = async (req, res) => {
  try {
    const currentUser = await User.findOne({username:req.params.username});

    const posts = await Post.find({ userId: currentUser._id });
    res.status(200).json(posts);
    
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
};


// comment's on a post
const createComment = async(req, res)=>{
  try{
    console.log(req.body)
    console.log(req.params)
    const username = req.body.username;
    const comment = req.body.comment;
    const postId = req.params.postId;
    const data = {
      comment:comment,
      username:username,
    }
    const post = await Post.findById(postId);
    if(!post)
    {
      throw Error('Post data not correct');
    }
    await post.updateOne({$push : {comments: data}})
    res.status(200).json({comment:comment, username:username})

  }catch(err)
  {
    console.log(err)
    res.status(401).json(err);
  }
}


// save and unsave a post , savepost handler
const savePost = async(req, res)=>{
  const postId = req.params.postId
  const userId = req.body.userId;
  try{
    const user = await User.findById(userId);
    const check = user.savedPosts.includes(postId)
    if(!check)
    {
      await User.findByIdAndUpdate(userId,{$push:{savedPosts:postId}});
      res.status(200).json("Post has been saved");
    }else{
      // await User.findByIdAndUpdate(userId, {$pull:{savedPosts:postId}})
      res.status(200).json("Post is already saved")
    }
  }catch(err)
  {
    res.status(500).json(err);
  }
}

// unsave a post
const unsavePost = async (req, res)=>{
  const postId = req.params.postId
  const userId = req.body.userId;
  try{
    const user = await User.findById(userId);
    const check = user.savedPosts.includes(postId)
    if(check)
    {
      await User.findByIdAndUpdate(userId,{$pull:{savedPosts:postId}});
      res.status(200).json("Post has been unsaved successfully");
    }else{
      // await User.findByIdAndUpdate(userId, {$pull:{savedPosts:postId}})
      res.status(200).json("Post is already Unsaved")
    }
  }catch(err)
  {
    res.status(500).json(err);
  }
}



const getsavedposts = async(req, res)=>{
  try {
    const currentUser = await User.findById(req.params.userId);
    const savedPostIds = currentUser.savedPosts.map(postId=>mongoose.Types.ObjectId(postId)) // converting the savedPostids string value to ObjectId value
    const savedposts = await Post.find({_id:{$in:savedPostIds}})
    res.status(200).json(savedposts)

  } catch (error) {
    res.status(500).json(error)
  }
}

const isSaved = async(req, res)=>{
  try{
    const postId = req.params.postId;
    const userId  =req.params.userId;

    const user = await User.findById(userId);
    if(user.savedPosts.includes(postId))
    {
      res.status(200).json(true)
    }
    else{
      res.status(200).json(false);
    }
  }catch(err)
  {
    res.status(500).json(err);
  }
}

module.exports = {
  createPostHandler,
  updatePostHandler,
  deletePostHandler,
  likeHandler,
  getPost,
  getTimeline,
  getUserPosts,
  createComment,
  savePost,
  unsavePost,
  getsavedposts,
  isSaved,
};
