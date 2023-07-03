const Group = require('../models/Group')
const Post = require('../models/Post');
const User = require('../models/User');
const mongoose = require('mongoose')

// create a group
const createGroup = async(req, res)=>{
    const members = [];
    members.push(req.body.admin);
    req.body.members = members;
    const userId = req.body.admin;

    const newGroup = new Group(req.body)
    try{
        const savedGroup = await newGroup.save();
        await User.findByIdAndUpdate(userId,{$push:{groups:savedGroup._id.toString()}})
        res.status(200).json(savedGroup);
    }
    catch(err){
        res.status(500).json(err);
    }
    // res.status(200).json("ok")
}


const getGroup = async(req, res)=>{
    const groupId = req.params.groupId
    // const userId = req.body.userId;
    try{
        const group = await Group.findOne({_id:groupId})
        if(!group)
        {
            res.status(403).json("Group not found")
        }
        res.status(200).json(group);
    }catch(error)
    {
        res.status(500).json(error);
    }
}

// get a list of groups

const getGroupList = async(req, res)=>{
    // const groupList = []
    // const userId = req.params.userId
    // console.log(userId)
    try{
        const user = await User.findById(req.params.userId);
        // console.log(user)
        const groupList = await Group.find({_id:{$in:user.groups}})
        res.status(200).json(groupList)
    }catch(err){
        res.status(500).json(err)
    }
}

// delete a group
const deleteGroup = async(req, res)=>{
    const groupId = mongoose.Types.ObjectId(req.params.groupId)
    // console.log(typeof(groupId))
    try{
        // const groupId = mongoose.Types.ObjectId(req.params.groupId)
        const group = await Group.findOne({_id:groupId})
        console.log(group)
        if(group)
        {
            await group.deleteOne({_id:groupId})
            res.status(200).json("Successfully Deleted")
        }
        else{
            res.status(403).json("The current group Not found")
        }
        // res.status(200).json("OK")

    }catch(err)
    {
        res.status(500).json(err);
    }
}

//get the members list of a group
const getMembersList = async(req, res)=>{
    const groupId = mongoose.Types.ObjectId(req.params.groupId)
    // const membersList = []
    try{
        const group = await Group.findOne({_id:groupId})
        const membersList = await Promise.all(
            group.members.map(async(userId)=>{
                const user =await User.findById(userId)
                const {password, updatedAt, groups, savedPosts, followers, followings, ...other} = user._doc
                // console.log(other)
                return other;
            })
        )
        // console.log(membersList)
        res.status(200).json(membersList)
    }catch(err)
    {
        console.log(err)
        res.status(500).json(err)
    }
    
}


// join a group
const joinGroup = async (req, res)=>{
    const userId = req.body.userId;
    const groupId = req.params.groupId;
    try {
        const user = await User.findById(userId);
        if(!user)
        {
            throw Error("User not found")
        }
        if(user.groups.includes(groupId))
        {
            throw Error("Already member of that group")
        }
        const group = await Group.findOne({_id:groupId})
        if(!group)
        {
            throw Error("Group not found")
        }
        await user.updateOne({$push:{groups:groupId}})
        await group.updateOne({$push:{members:userId}})
        res.status(200).json("Joined group successfully")
    } catch (error) {
        console.log(error)
        res.status(401).json(error.message);
    }
}

module.exports = {
    createGroup,
    getGroup,
    getGroupList,
    joinGroup,
    deleteGroup,
    getMembersList,
};