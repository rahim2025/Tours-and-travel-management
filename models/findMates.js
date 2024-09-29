const mongoose = require ("mongoose");
const {Schema} = mongoose;
const User = require("./user.js");

 const findMatesSchema = new mongoose.Schema({
    title :{
        type : String,
        required :true,
    },
    startingPoint:{
        type : String,
        required :true,
    },
    startingDate:{
        type : Date,
        required :true,
    },
    endingDate:{
        type : Date,
        required :true,
    },
    destination:{
        type : String,
        required :true,
    },
    description:{
        type : String,
        required :true,
    },
    budget:{
        type : Number,
        required :true,
    },
    createdAt:{
        type : Date,
        default : Date.now(),
    },
    host:{
        type:Schema.Types.ObjectId,
        ref : "User"
    },
   });
module.exports = mongoose.model("FindMates",findMatesSchema);