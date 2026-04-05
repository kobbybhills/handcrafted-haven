import mongoose from "mongoose";

const MONGODB_URI = process.env.DATABASE_URL || process.env.MONGODB_URI;

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) {
    return;
  }

  try {
    
    if (!MONGODB_URI) {
      throw new Error(
        "Database connection string is missing. Please define DATABASE_URL or MONGODB_URI in Vercel settings."
      );
    }

    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB Connected Successfully via " + (process.env.DATABASE_URL ? "DATABASE_URL" : "MONGODB_URI"));
    
  } catch (error) {
    console.error("MongoDB connection error:", error); 
  }
};