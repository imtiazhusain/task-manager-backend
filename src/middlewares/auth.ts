import CustomErrorHandler from "./errors/customErrorHandler";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../config/envConfig";
import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import { IAuthRequest, ITokenPayload } from "../interfaces/interfaces";
import mongoose from "mongoose";
import TaskModel from "../models/Task.model";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!(authHeader && authHeader.startsWith("Bearer"))) {
      return next(CustomErrorHandler.unAuthorized());
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      return next(CustomErrorHandler.unAuthorized());
    }

    try {
      const tokenPayload = jwt.verify(
        token,
        ACCESS_TOKEN_SECRET as string
      ) as ITokenPayload;

      const _req = req as IAuthRequest;
      _req._id = tokenPayload._id;

      next();
    } catch (error) {
      console.log(error);
      return next(createHttpError(401, "Token Expired"));
    }
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Internal Server Error"));
  }
};

export const authorizeAccess = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const _req = req as IAuthRequest;
    const userId = _req._id;

    const params = req.params;

    const isValidId = mongoose.Types.ObjectId.isValid(params._id);
    if (!isValidId) {
      return next(createHttpError(403, "Invalid task ID"));
    }

    const task = await TaskModel.findById(params._id);
    if (!task) return next(CustomErrorHandler.notFound("Task not found"));

    // Check if the user is the creator of the task
    if (task.createdBy.toString() !== userId.toString()) {
      return next(CustomErrorHandler.unAuthorized());
    }

    next();
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Internal Server Error"));
  }
};
