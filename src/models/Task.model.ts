import mongoose from "mongoose";
import ITask from "../types/Task.type";

const taskSchema = new mongoose.Schema<ITask>(
  {
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: { type: String, required: true },
    status: { type: String, required: true },
    dueDate: { type: String, required: true },
    description: { type: String, required: true },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("Task", taskSchema);

export default TaskModel;
