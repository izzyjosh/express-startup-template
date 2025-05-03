import mongoose from "mongoose";
import config from "../config/config";

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(config.databaseUrl, {
      dbName: "myDB" // Optional if already in URI
    });
    console.log("Connected to MongoDB with Mongoose!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
}
