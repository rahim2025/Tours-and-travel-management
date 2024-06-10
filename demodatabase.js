const express = require ("express");
const { string, ref } = require("joi");
const app = express();
const mongoose = require ("mongoose");
const {Schema} = mongoose;

main().then((res)=>{
    console.log("Database connected");
} )
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/onetomany');
}

const productSchema = new Schema({
    item:{
        type:String,
    },
    price:{
        type:Number,
    }
})

const product = mongoose.model("product",productSchema);

const userSchema = new Schema({
    name:String,
    orders:[
        {
        type :Schema.Types.ObjectId,
        ref :"product"
        },
    ],
});

const user = mongoose.model("user",userSchema);

const addUser = async ()  =>{
    let user1 = new user ({
        name: "Mohammad Rahim",
});
    let order1 = await product.findOne({item:"burger"});
    let order2 = await product.findOne({item:"bbq"});

    user1.orders.push(order1);
    user1.orders.push(order2);

 let result = await user1.save();
 console.log(result);
};
addUser();

// const addproduct = async ()=>{
//     let result = await product.insertMany([
//         {item:"burger",price:260},
//         {item:"bbq",price:314},
//         {item:"pan-fried",price:280}

//     ]);
//     console.log(result);
// }
// addproduct();