import mongoose from "mongoose";
import IVerificationToken from "../types/VerificationToken.type";
const verificationTokenSchema = new mongoose.Schema<IVerificationToken>({
    owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},
    OTP:{type:String,required:true},
    expiresAt:{type:Date,default:Date.now,expires:8800}


},{timestamps:true})

const VerificationTokenModel = mongoose.model('VerificationToken',verificationTokenSchema)

export default VerificationTokenModel