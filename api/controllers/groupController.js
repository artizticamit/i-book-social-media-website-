const Group = require('../models/Group')
const Post = require('../models/Post');
const User = require('../models/User');


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

module.exports = {
    createGroup,
    getGroup,
    getGroupList,
};