const Group = require('../models/Group')
const Post = require('../models/Post')


// create a group
const createGroup = async(req, res)=>{
    const members = [];
    members.push(req.body.admin);
    req.body.members = members;

    const newGroup = new Group(req.body)
    try{
        const savedGroup = await newGroup.save();
        res.status(200).json(savedGroup);
    }
    catch(err){
        res.status(500).json(err);
    }
    // res.status(200).json("ok")
}


const getGroup = async(req, res)=>{
    const groupId = req.params.groupId
    const userId = req.body.userId;
    try{
        const group = await Group.findOne({_id:groupId})
        let flag = false;
        if(group)
        {
            group.members.map((member)=>
            {
                if(member==userId)
                {
                    flag=true;
                }
            })
            if(flag)
            {
                res.status(200).json(group)
            }
            else{
                res.status(403).json("error")
            }
        }
    }catch(error)
    {
        res.status(500).json(error);
    }
}

module.exports = {
    createGroup,
    getGroup,
};