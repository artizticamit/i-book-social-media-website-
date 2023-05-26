const router = require("express").Router();
const User = require("../models/User")
const bcrypt = require("bcrypt");
// console.log(User.)

// router.get("/:name", (req, res)=>{
//     let x = req.params.name;
//     console.log(x);
//     req.params.name = "kumar";
//     console.log(req.params.name);
//     res.send("Hey it is api "+x)

// })

//update user
router.put("/:id", async (req, res)=>{
    console.log("params = ",req.params)
    console.log("params = ",req.body)
    if(req.body.userId === req.params.id  || req.body.isAdmin){
        if(req.body.password)
        {
            try{
                const salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            } catch(err){
                return res.status(500).json(err)
            }
        }

        try{
            const user = await User.findByIdAndUpdate(req.params.id, {$set: req.body,});
            res.status(200).json("Successful, Account has been updated");
        }catch(err){
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only update your account")
    }
})

//Delete user
router.delete("/:id", async (req, res)=>{
    console.log("params = ",req.params)
    console.log("params = ",req.body)
    if(req.body.userId === req.params.id  || req.body.isAdmin){
        try{
            await User.findByIdAndDelete(req.params.id);
            res.status(200).json("Account has been deleted successfully");
        }catch(err){
            console.log(err);
            return res.status(500).json(err);
        }
    }else{
        return res.status(403).json("You can only delete your account")
    }
})


//Get a user
router.get("/", async (req, res)=>{
    const userId = req.query.userId
    const username = req.query.username
    console.log("userId or username = ",userId?userId:username);
    try{
        // console.log(req.params.id);
        const user = userId ? await User.findById(userId): await User.findOne({username: username})
        const {password, updatedAt, ...other} = user._doc

        res.status(200).json(other);
    }catch(err){
        console.log(err);
        res.status(500).json(err);
    }
})


//follow a user

router.put("/:id/follow", async (req, res)=>{
    if(req.body.userId !== req.params.id)
    {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(!user.followers.includes(req.body.userId)){
                await user.updateOne({$push: {followers: req.body.userId}});
                await currentUser.updateOne({ $push : { followings: req.params.id}});
                res.status(200).json("user has been followed")

            }else{
                res.status(403).json("you already follow this user")
            }

        }catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(403).json("you cant follow yourself")
    }
})
//unfollow a user

router.put("/:id/unfollow", async (req, res)=>{
    if(req.body.userId !== req.params.id)
    {
        try{
            const user = await User.findById(req.params.id);
            const currentUser = await User.findById(req.body.userId);
            if(user.followers.includes(req.body.userId)){
                await user.updateOne({$pull: {followers: req.body.userId}});
                await currentUser.updateOne({ $pull : { followings: req.params.id}});
                res.status(200).json("user has been unfollowed")

            }else{
                res.status(403).json("user has been already unfollowed")
            }

        }catch(err){
            res.status(500).json(err);
        }

    }else{
        res.status(403).json("you cant unfollow yourself")
    }
})

// get friends
router.get("/friends/:userId", async (req, res)=>{
    try{
        const user = await User.findById(req.params.userId);
        const friends = await Promise.all(
            user.followings.map((friendId)=>{
                return User.findById(friendId);
            })
        )
        let friendList = [];
        friends.map(friend=>{
            const {_id, username, profilePicture} = friend;
            friendList.push({_id, username, profilePicture})
        })
        res.status(200).json(friendList);
    }catch(err)
    {
        res.status(500).json(err)
    }
})


module.exports = router