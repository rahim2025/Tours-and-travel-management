const mongoose = require ("mongoose");
const {Schema} = mongoose;
const Review = require("./review.js");
const { string } = require("joi");

const listingSchema = new mongoose.Schema({
    title :{
        type : String,
        required :true,
    },
    description:{
        type : String,
        required :true,
    },
    image:{
       url : String,
       filename : String
    },
    price:{
        type : Number,
        required :true,
    },
location:String,
country:String,
geomatry: {
        type: {
          type: String, // Don't do `{ location: { type: String } }`
          enum: ['Point'], // 'location.type' must be 'Point'
          required: true
        },
        coordinates: {
          type: [Number],
          required: true
        }
      },
reviews :[
        {
            type : Schema.Types.ObjectId,
            ref : "Review",
        },
    ],
owner:{
    type:Schema.Types.ObjectId,
    ref : "User"
},
});

listingSchema.post("findOneAndDelete", async (listing) =>{{
    if(listing){
        await Review.deleteMany({_id:{$in:listing.reviews}});
    };
}});

module.exports = mongoose.model("Listing",listingSchema);

