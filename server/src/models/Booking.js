import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
    userId :{type:String, required:true},
    name : {type:String, required: true},
    email:{type:String, required:true},
    phone:{type:String, required: true},
    slotName:{type:String, required:true},
    slot:{type:String, required:true},
    date: {type:String, required:true},
    turf:{type:String,required:true},
    timeStamp:{type:Number, required:true},
    placedOn:{type:Number, required:true}
})

const Booking = mongoose.model.Booking || mongoose.model('Booking',bookingSchema)

export default Booking