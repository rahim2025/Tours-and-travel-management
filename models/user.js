const { required } = require("joi");
const mongoose = require ("mongoose");
const schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new schema({
    username:{
        type:String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
});
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', userSchema);