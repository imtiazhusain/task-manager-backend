import mongoose from "mongoose";
import IUser from "../types/User.type";
const userSchema = new mongoose.Schema<IUser>({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    profilePic:{type:String,default:'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'},
    password:{type:String,required:true},
    isVerified:{type:Boolean,default:false}
},{timestamps:true})

const UserModel =  mongoose.model<IUser>('User',userSchema)

export default UserModel