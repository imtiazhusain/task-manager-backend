import { Request } from "express";
import { ObjectId } from "mongoose";

// access token payload interface
export interface ITokenPayload {
  _id: ObjectId;
}

// interface to store user id in auth middleware
export interface IAuthRequest extends Request {
  _id: ObjectId;
}

export interface IUserRegistrationBody {
  name: string;
  email: string;
  password: string;
  profilePic: string;
  phoneNo: string;
  country: string;
  city: string;
}

export interface ITaskQuery {
  createdBy: ObjectId;
  status?: string;
}

export interface ITaskUpdateData {
  title: string;
  status: string;
  dueDate: string;
  description: string;
}

export interface IEditUser {
  name: string;
  email: string;
  profilePic?: string | null;
  password?: string;
}

export interface IAllPostQuery {
  status?: string;
  author?: ObjectId;
}
