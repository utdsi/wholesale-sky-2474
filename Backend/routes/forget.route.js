const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require('nodemailer');
const { UserModel } = require("../models/User.model");
const bcrypt = require("bcrypt")
require('dotenv').config()
const forgetRoute = express.Router();



forgetRoute.post("/",async(req,res)=>{

        try {
            const email  = req.body.email;
            const user =  await UserModel.find({email:email})
            let random = GenerateOtp();

            await sendEmail(email,random);


            res.send({"user":user,"otp":random})
        } catch (error) {
            console.log(error)
        }
        

})

const GenerateOtp = ()=>{
    return(Math.floor(100000 + Math.random() * 900000));
}

const sendEmail = (email,otp)=>{
    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
            user: 'utkarshsinha854@gmail.com',
            pass: process.env.gkey
        }
    });
    
    let mailOptions = {
        from: 'utkarshsinha854',
        to: `${email}`,
        subject: 'Change Password',
        text: `Your otp for verification is:-${otp}`
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error.message);
        }
        console.log('success');
    });
}

forgetRoute.patch("/update",async(req,res)=>{
    const {email,password} = req.body;
    // console.log(req.body)
    try {
        bcrypt.hash(password, 4 ,async(err,hash)=>{
            await UserModel.findOneAndUpdate({email:email},{password:hash})
            res.send({"data":req.body})
            })

    } catch (error) {
        res.send(error)
    }
})

module.exports={
    forgetRoute
}
