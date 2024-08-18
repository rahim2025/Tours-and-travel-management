const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tourmatePostSchema = new Schema({
    title: String,
    description: String,
    location: String,
    tourDate: Date,
    numberOfDays: Number,
    people: Number,
    socialMedia: String,
    contact: String,
    email: String,
    requirements: String,
    estimatedCost: String,
    about: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('TourmatePost', tourmatePostSchema);