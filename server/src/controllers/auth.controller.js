import User from "../models/User.js"
import Booking from '../models/Booking.js'
import bcrypt from 'bcrypt'
import generateToken from "../utils/jwt.js"

export const login =async (req,res)=>{
    try {
        const {email,password} = req.body
        const isUser =await User.findOne({email})
        if(!isUser){
            return res.status(404).json({message:"User Not Found"})
        }
        const verifyPassword =await bcrypt.compare(password,isUser.password)
        if(!verifyPassword){
            return res.status(401).json({message:"Incorrect Credentials"})
        }
        generateToken(isUser._id,res)
        return res.status(200).json({
            _id : isUser._id,
            name: isUser.name,
            email: isUser.email,
            phone: isUser.phone,
            role:isUser.role,
            status:isUser.status
        })

    } catch (error) {
        return res.status(500).json({message: "internal server error"})
    }
}

export const signup = async (req,res) =>{
    try {
        const {name,email,phone,password} = req.body
        const newphone = '880' + phone
        const updatedPhone = Number(newphone)
        const user = await User.findOne({email})
        if(user){
            return res.status(403).json({message:'User Already Exists'})
        }
        const sr =await bcrypt.genSalt(10)
        const newPassword =await bcrypt.hash(password,sr)
        const newUser= new User({
            name:name,
            email :email,
            phone:updatedPhone,
            password:newPassword
        })
        await  newUser.save()
        return res.status(200).json({message:"User Created Successfully"})
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const authUser = async(req,res) => {
    try {
        return res.status(200).json(req.user)
    } catch (error) {
        console.log(error)
        return res.statsu(500).json({message:"Internal Server Error"})
    }
}

export const logout = async (req,res)=>{
    try {
        await res.cookie("jwt","",{maxAge:0})
        return res.status(200).json({message:'Logged out Successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({message:"Internal Server Error"})
    }
}
export const changePassword = async(req,res)=>{
    try {
        const {currentPassword,newPassword} = req.body
        const {_id,password} = req.user
        const verify = await bcrypt.compare(currentPassword,password)
        if(!verify){
            return res.status(401).json({message:'Wrong Current Password'})
        }
        const sr = await bcrypt.genSalt(10)
        const updatedPassword = await bcrypt.hash(newPassword,sr)
        const user = await User.findById(_id)
        user.password = updatedPassword
        await user.save()
        return res.status(200).json({message:'Password Updated'})
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const changeInformation = async(req,res)=>{
    try {
        const{_id,password} = req.user
        const{name,email,phone,currentPassword} = req.body
        const verify = await bcrypt.compare(currentPassword,password)
        if(!verify){
            return res.status(401).json({message:'Wrong Password'})
        }
        const user = await User.findById(_id).select('-password')
        user.name = name
        user.phone = phone
        user.email = email
        await user.save()
        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }
}
export const bookignInfo = async (req,res)=>{
    try {
        const {_id} = req.user
        const userId = _id.toString()
        const matches = await Booking.find({userId})
        return res.status(200).json(matches)
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }
}