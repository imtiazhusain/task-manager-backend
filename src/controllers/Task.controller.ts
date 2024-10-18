import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import CustomErrorHandler from "../middlewares/errors/customErrorHandler";
import { taskValidation } from "../utils/joiValidation";
import TaskModel from "../models/Task.model";
import {
  IAuthRequest,
  ITaskUpdateData,
  ITaskQuery,
} from "../interfaces/interfaces";
import mongoose from "mongoose";

const createTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { error } = taskValidation(req.body);

    if (error) {
      console.log(error.message);
      return next(createHttpError(422, error.message));
    }

    const { title, status, dueDate, description } = req.body;

    const _req = req as IAuthRequest;
    const createdTask = new TaskModel({
      createdBy: _req._id,
      title,
      status,
      dueDate,
      description,
    });

    await createdTask.save();

    let newTask = {
      _id: createdTask._id,
      title: createdTask.title,
      status: createdTask.status,
      dueDate: createdTask.dueDate,
      description: createdTask.description,
    };

    return res.status(201).json({
      status: true,
      message: "Task created successfully",
      newTask: newTask,
    });
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.serverError());
  }
};

// const userTasks = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { status, time = "Latest" } = req.query as {
//       status?: string;
//       time?: string;
//     };

//     const _req = req as IAuthRequest;

//     // Constructing the query object
//     const query: ITaskQuery = {
//       createdBy: _req._id,
//       ...(status && { status }),
//     };

//     const sortOrder = time === "Latest" ? -1 : 1;

//     const tasks = await TaskModel.find(query)
//       .select("title status dueDate description _id")
//       .sort({ createdAt: sortOrder });
//     return res.status(200).json({
//       status: true,
//       taskData: tasks,
//     });
//   } catch (error) {
//     console.log(error);
//     return next(CustomErrorHandler.serverError());
//   }
// };

const userTasks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      status,
      time = "Latest",
      page = 1,
      limit = 10,
    } = req.query as {
      status?: string;
      time?: string;
      page?: string;
      limit?: string;
    };

    const _req = req as IAuthRequest;

    // Constructing the query object
    const query: ITaskQuery = {
      createdBy: _req._id,
      ...(status && { status }),
    };

    const sortOrder = time === "Latest" ? -1 : 1;

    // Convert page and limit to numbers and calculate how many tasks to skip
    const pageNumber = Number(page);
    const limitNumber = Number(limit);
    const skip = (pageNumber - 1) * limitNumber;

    // Fetch tasks with pagination
    const tasks = await TaskModel.find(query)
      .select("title status dueDate description _id")
      .sort({ dueDate: sortOrder })
      .skip(skip) // Skip the tasks of previous pages
      .limit(limitNumber); // Limit the number of tasks to display per page

    // Count the total number of tasks for this query
    const totalTasks = await TaskModel.countDocuments(query);

    // Calculate total number of pages
    const totalPages = Math.ceil(totalTasks / limitNumber);

    return res.status(200).json({
      status: true,
      taskData: tasks,
      currentPage: pageNumber,
      totalPages,
      totalTasks,
    });
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.serverError());
  }
};

const getTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;

    const isValidId = mongoose.Types.ObjectId.isValid(params._id);
    if (!isValidId) {
      return next(createHttpError(403, "Invalid post ID"));
    }

    const task = await TaskModel.findById(params._id).select("-__v");
    if (!task) return next(CustomErrorHandler.notFound("Task not found"));

    return res.status(200).json({
      status: true,
      taskData: task,
    });
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.serverError());
  }
};

const editTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;
    if (!params._id) {
      return next(createHttpError(403, "Task ID is missing"));
    }

    const { title, status, dueDate, description } = req.body;

    // validation
    const isValidID = mongoose.Types.ObjectId.isValid(params._id);

    if (!isValidID) {
      return next(CustomErrorHandler.invalidId("Invalid Task ID"));
    }
    const { error } = taskValidation(req.body);

    if (error) {
      console.log(error.message);
      return next(createHttpError(422, error.message));
    }

    const taskUpdatedData: ITaskUpdateData = {
      title,
      status,
      dueDate,
      description,
    };

    let updatedTask = await TaskModel.findByIdAndUpdate(
      params._id,
      taskUpdatedData,
      { new: true } // Return the updated document
    ).select("title status dueDate description _id");

    return res.status(200).json({
      status: true,
      message: "Task updated successfully",
      updatedTask: updatedTask,
    });
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.serverError());
  }
};

const deleteTask = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const params = req.params;

    const isValidId = mongoose.Types.ObjectId.isValid(params._id);
    if (!isValidId) {
      return next(createHttpError(403, "Invalid task ID"));
    }

    const task = await TaskModel.findByIdAndDelete(params._id);
    if (!task) return next(CustomErrorHandler.notFound("task not found"));

    return res.status(200).json({
      status: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return next(CustomErrorHandler.serverError());
  }
};

export { createTask, userTasks, getTask, editTask, deleteTask };
