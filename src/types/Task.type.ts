import { ObjectId } from "mongoose";

interface ITask {
  createdBy: ObjectId;
  title: string;
  status: string;
  dueDate: string;
  description: string;
}

export default ITask;
