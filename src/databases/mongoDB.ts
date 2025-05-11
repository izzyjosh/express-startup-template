import mongoose from "mongoose";
import config from "../config/config";

let isConnected = false;

export async function connectToDatabase(): Promise<void> {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(config.databaseUrl, {
      dbName: "myDB", // Optional if in URI
    });
    isConnected = true;
    console.log("Connected to MongoDB with Mongoose!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}