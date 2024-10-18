import { DEBUG_MODE } from "../../config/envConfig";

import {  NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";


const globalErrorHandler = (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  return res.status(statusCode).json({
    
      status:false,
      message: err.message,
      ...(DEBUG_MODE &&{
          errorStack:  err.stack,
      })
    
    
  });
};

export default globalErrorHandler;
