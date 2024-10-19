import express from "express";
import {
  createTask,
  userTasks,
  editTask,
  deleteTask,
} from "../controllers/Task.controller";
import { authenticateUser, authorizeAccess } from "../middlewares/auth";
const router = express.Router();

router.post("/", authenticateUser, createTask);
router.get("/", authenticateUser, userTasks);
router.patch("/:_id", authenticateUser, authorizeAccess, editTask);
router.delete("/:_id", authenticateUser, authorizeAccess, deleteTask);

export default router;
