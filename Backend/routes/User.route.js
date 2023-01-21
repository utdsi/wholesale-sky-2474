const express = require("express");
const mongoose = require("mongoose");
const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { Userauthenticate } = require("../middlewares/user.auth");

const UserRouter = express.Router();


UserRouter.post("/signup",(req,res)=>{
    
    const {email,username,password,phone}  = req.body
    try {
        bcrypt.hash(password, 4 ,async(err,hash)=>{
        const user = new UserModel({email,username,phone,password:hash});
        await user.save();
        res.send({"msg":"signup successful"})
        })
        
    } catch (error) {
        console.log(error)
    }
})

UserRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(user.length>0){
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    const token = jwt.sign({"userID":user._id}, 'push');
                    res.send({"msg":"Login Success","token":token})
                }
                else{
                    res.send({"msg":"Invalid Details"})
                }
            })  
        }
        else{
            res.send({"user":user})
        }
    } catch (error) {
        console.log("something went wrong")
    }
})
UserRouter.use("/",Userauthenticate)
UserRouter.get("/",async(req,res)=>{
    const userID = req.body.userID;
    try {
        const user = await UserModel.find({_id:userID});
        // console.log(user)
        res.send({"user":user})
    } catch (error) {
        console.log(error)
        res.send("User fetch Error");
    }
})

module.exports={
    UserRouter
}