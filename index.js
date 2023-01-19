const express = require("express")

const {connection} = require("./config/db.js")
const {userRouter} = require("./routes/user.route.js")



const app = express()

app.use(express())

app.get("/",(req,res)=>{
    res.send("welcome")
})
app.use("/auth",userRouter)
app.listen(process.env.port,async ()=>{
    try {
        await connection
        console.log("connection to db ")
    } catch (error) {
        console.log({"error in db":error})
    }
    console.log(`listening on port ${process.env.port}`)
})