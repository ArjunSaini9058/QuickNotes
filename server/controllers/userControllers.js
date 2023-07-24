import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const SECRET_KEY = "SECRET_KEY";
export const signup=async(req,res)=>{
    const {username, email, password} = req.body;
    try {
        const existingUser = await userModel.findOne({ email : email});
        if(existingUser){
            return res.status(400).json({message: "User already exists"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const userdata = new userModel({
            email: email,
            password: hashedPassword,
            username: username
        })
        await userdata.save();

        const token = jwt.sign({email : userdata.email, id : userdata._id }, SECRET_KEY,{expiresIn:'1d'});
        res.status(201).json({user: userdata, token: token});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}
export const signin = async (req, res)=>{
    
    const {email, password} = req.body;

    try {
        
        const existingUser = await userModel.findOne({ email : email});
        if(!existingUser){
            return res.status(404).json({message: "User not found"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        const token = jwt.sign({email : existingUser.email, id : existingUser._id }, SECRET_KEY,{expiresIn:'1d'});
        res.status(200).json({user: existingUser, token: token});


    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong"});
    }

}