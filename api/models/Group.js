const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,
        },
        members:{
            type:Array,
            max:10,
            default:[]
        },
        posts:{
            type:Array,
            default:[]
        },
        admin:{
            type:String,
            required:true,
        },
        desc:{
            type:String,
        }
    },
    {
        timestamps:true
    }
);

module.exports = mongoose.model("Group", GroupSchema);