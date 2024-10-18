import mongoose from "mongoose";
import { DATABASE_URL } from "./envConfig";

const connectDB = async () => {
  try {
    const options = {
      dbName: "TaskManagement",
    };
    mongoose.connection.on("connected", () => {
      console.log("Database Connected...");
    });

    mongoose.connection.on("error", (err) => {
      console.log("Error in connecting to database.", err);
    });

    await mongoose.connect(DATABASE_URL as string, options);
  } catch (err) {
    console.error("Failed to connect to database.", err);
    process.exit(1);
  }
};

export default connectDB;
