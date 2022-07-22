const router = require("express").Router();
const { response } = require("express");
const Post = require("../models/Post")
const User = require("../models/User")

// Create a post

router.post("/", async (req, res)=>{
    const newPost = new Post(req.body)
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost)
    }catch(err)
    {
        res.status(500).json(err);
    }
})

//Update a post

router.put("/:id", async (req, res)=>{

    try{

        const post = await Post.findById(req.params.id);
        console.log(req.params.id);
        if(post.userId=== req.body.userId){
            await post.updateOne({$set: req.body});
            res.status(200).json("the post has been updated");
            
        }else{
            res.status(403).json("You can update only your post")
        }
    }catch(err)
    {
        res.status(500).json(err);
    }

})

//Delete a post
router.delete("/:id", async (req, res)=>{

    try{

        const post = await Post.findById(req.params.id);
        if(post.userId=== req.body.userId){
            await post.deleteOne({$set: req.body});
            res.status(200).json("the post has been deleted");
            
        }else{
            res.status(403).json("You can delete only your post")
        }
    }catch(err)
    {
        res.status(500).json(err);
    }

})

// Like a post or dislike a post

router.put("/:id/like", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(!post.likes.includes(req.body.userId))
        {
            await post.updateOne({$push:{likes: req.body.userId}});
            res.status(200).json("The post has been liked");
        } else{
            await post.updateOne({$pull: {likes:req.body.userId}});
            res.status(200).json("The post has been disliked");
        }
    }catch(err)
    {
        res.status(500).json(err);
    }

})

// Get a post

router.get("/:id", async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post)
        {
            res.status(200).json(post);
        }
        else{
            res.status(404).json("Post not found");
        }
    }catch(err)
    {
        res.status(500).json(err);
    }
})

// get timeline posts

router.get("/timeline/:userId", async (req, res)=>{
    // let postArray = [];
    try{
        const currentUser = await User.findById(req.params.userId);
        console.log(req.params.userId);
        const userPosts = await Post.find({userId: req.params.userId});
        const friendPosts = await Promise.all(
            currentUser.followings.map(friendId=>{
                return Post.find({userId: friendId})
            })
        );

        res.status(200).json(userPosts.concat(...friendPosts))

    }catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
})
// get users posts

router.get("/profile/:username", async (req, res)=>{
    // let postArray = [];
    try{
        const user = await User.findOne({username: req.params.username});
        const posts = await Post.find({userId: user._id});

        res.status(200).json(posts);

    }catch(err)
    {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;