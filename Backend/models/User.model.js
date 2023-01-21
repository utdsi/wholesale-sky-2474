const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    username:String,
    email:{ 
        type: String,
        required: true,
        
      },
    password:String,
    phone:String

})


const UserModel = mongoose.model("user",userSchema)

module.exports = {
    UserModel
}