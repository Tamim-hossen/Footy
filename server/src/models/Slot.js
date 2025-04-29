import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema({
    date: {type:String, required:true},
    turf:{type:String,required:true},
    S1:{type:Boolean, required:false,default:false},
    S2:{type:Boolean, required:false,default:false},
    S3:{type:Boolean, required:false,default:false},
    S4:{type:Boolean, required:false,default:false},
    S5:{type:Boolean, required:false,default:false},
    S6:{type:Boolean, required:false,default:false},
    S7:{type:Boolean, required:false,default:false},
    S8:{type:Boolean, required:false,default:false},
    S9:{type:Boolean, required:false,default:false},
    S10:{type:Boolean, required:false,default:false},
    S11:{type:Boolean, required:false,default:false},
    S12:{type:Boolean, required:false,default:false},
    S13:{type:Boolean, required:false,default:false},
    S14:{type:Boolean, required:false,default:false},
})

const Slot = mongoose.model.Slot || mongoose.model('Slot',SlotSchema)


export default Slot