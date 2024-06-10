const mongoose = require ("mongoose");
const initData = require("./data.js");
const Listing = require ("../models/listing.js");



main().then((res)=>{
    console.log("Database connected");
} )
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');
}

const initDB = async () =>{
    await Listing.deleteMany({});
    initData.data = initData.data.map((obj)=>({...obj,owner:"65ff335b08b0be9d7b11d527"}));
    await  Listing.insertMany(initData.data);
    console.log("Success");
}

initDB();

