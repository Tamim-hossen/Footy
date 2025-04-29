import mongoose from 'mongoose'
import User from '../models/User.js'
import Slot from '../models/Slot.js'
import Bookings from '../models/Booking.js'

export const getUsers = async (req,res) =>{
try {
    const{_id,name,email} = req.user
    const userId =new mongoose.Types.ObjectId(_id)
    const users = await User.find({_id:{$ne:userId}}).select('-password')
    return res.status(200).json(users)
} catch (error) {
    return res.status(500).json({message:'Internal Server Error'})
}
}

export const banUser=async(req,res)=>{
try {
    const id = new mongoose.Types.ObjectId(req.body.id)
    const user = await User.findById(id)
    user.status = 'suspended'
    await user.save()
    return res.status(200).json({message:'Account Suspended'})
} catch (error) {
    return res.status(500).json({message:'Internal Server Error'})
}
}
export const addAdmin=async(req,res)=>{
    try {
        const {email} = req.body
        const user = await User.findOne({email})
        if(!user){
            return res.status(404).json({message:'User not Found'})
        }
        if(user.role === 'admin'){
            return res.status(409).json({message:'User already an admin'})
        }
        user.role = 'admin'
        await user.save()
        return res.status(200).json({message:'Admin priviledge granted'})
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }
    }
    export const removeAdmin=async(req,res)=>{
        try {
            const {email} = req.body
            const user = await User.findOne({email})
            if(!user){
                return res.status(404).json({message:'User not Found'})
            }
            if(user.role === 'user'){
                return res.status(409).json({message:'Not an Admin'})
            }
            user.role = 'user'
            await user.save()
            return res.status(200).json({message:'Admin priviledge Removed'})
        } catch (error) {
            return res.status(500).json({message:'Internal Server Error'})
        }
        }
export const unbanUser=async(req,res)=>{
    try {
        const id = new mongoose.Types.ObjectId(req.body.id)
        const user = await User.findById(id)
        user.status = 'active'
        await user.save()
        return res.status(200).json({message:'Account Unbanned'})
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }
    }

export const getboookings = async (req,res)=>{
    try {
        const bookings = await Bookings.find();
        return res.status(200).json(bookings)
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const individualDetails = async(req,res)=>{
   try {
    const userId= req.query.userId
    const userbokings = await Bookings.find({userId})
    return res.status(200).json(userbokings)
   } catch (error) {
    return res.status(500).json({message:'Internal Server Error'})
   }
}