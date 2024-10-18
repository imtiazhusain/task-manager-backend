import { ObjectId } from "mongoose"

interface IVerificationToken{
    owner:ObjectId,
    OTP:string,
    expiresAt:Date
}

export default IVerificationToken