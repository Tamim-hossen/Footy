import User from "../models/User.js"
import Booking from "../models/Booking.js"
import Slot from "../models/Slot.js"
export const book =async (req,res)=>{
    try {
        const {userId,name,email,phone,date,slot,slotName,turf,timeStamp,placedOn} = req.body
        const slotbooked =await Slot.findOne({date,turf})
        if(!slotbooked){
            const newSlot = new Slot({
                date:date,
                turf:turf,
                [slotName]:true,
            })
            await newSlot.save()
        }
        else if(slotbooked[slotName] === true){
            return res.status(401).json({message:"Slot Already Booked"})
        }
        else if(slotbooked[slotName] !== true){
            slotbooked[slotName] = true;
            await slotbooked.save()
        }

        const newBooking = new Booking({
            userId: userId,
            name: name,
            email:email,
            phone:phone,
            date:date,
            slot:slot,
            slotName:slotName,
            turf:turf,
            timeStamp:timeStamp,
            placedOn: placedOn
        })
        

        await newBooking.save()
        return res.status(200).json({message:"Slot Booked"})
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }
}

export const getTurfInfo = async (req,res)=>{
    try {
        const safeQuery = JSON.parse(JSON.stringify(req.query));
        const{date,turf} = safeQuery
        const slotbooked =await Slot.findOne({date,turf})
        if(!slotbooked){
            return res.status(404).json({message:'Not Found'})
        }
        return res.status(200).json(slotbooked)
    } catch (error) {
        return res.status(500).json({message:'Internal Server Error'})
    }

}