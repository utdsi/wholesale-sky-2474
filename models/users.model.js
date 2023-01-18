
const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,

    },
    email:String,
    password:String,
    phone:Number,
    role:{
        type:String,
        enum:["user","seller","admin"],
        default:"user"
    }

})

const Usermodel = mongoose.model("user",userSchema)

module.exports = {Usermodel}