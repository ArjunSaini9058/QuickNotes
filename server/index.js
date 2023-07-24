import express from 'express';
const app=express();
import cors from 'cors'
import userRouter from './routes/userRoutes.js';
import noteRouter from './routes/noteRoutes.js';
import mongoose from 'mongoose';
import dotenv from "dotenv"
dotenv.config();
const URL=process.env.URL
app.use(express.json());
app.use(cors());
app.get("/",(req,res)=>{
    res.json({
        message:"a sample api"
    })
})
app.use("/user",userRouter)
app.use("/note",noteRouter)
const connection=async(URL)=>{
    try{
        await mongoose.connect(URL)
        console.log("databse Connected")
    }catch(e){
        console.log("Database Not Connnected",e)
    }
}
connection(URL)
// listening on server
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`)
})