const express = require("express")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const userRouter = express.Router()

const {Usermodel} = require("../models/users.model.js")

userRouter.post("/signup",async(req,res)=>{
    const {email,password} = req.body
    

    // try {
    //     const user = await Usermodel.findOne({email})
    //     if(user){
    //         res.send("user already present")
    //     }else{
    //         bcrypt.hash(password, 8,async function(err, hash) {
    //             // Store hash in your password DB.
    //             const users = new Usermodel({email,password:hash})
    //             await users.save()
    //             res.send("signup successful")
    //         });

    //     }
    // } catch (error) {
    //     console.log(error)
    // }
})

module.exports = {userRouter}