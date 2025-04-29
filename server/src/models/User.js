import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: {type:String, required:true},
    email: {type:String, required:true},
    phone: {type:Number, required:true},
    password:{type:String, required:true},
    role:{type:String, required:false, default:'user'},
    status:{type:String, required:false, default:'active'}
    
})

const User = mongoose.model.User||mongoose.model('User',UserSchema)

export default User