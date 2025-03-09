import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database Connected Successfully");
  } catch (err) {
    console.error(`Error occurred when connecting to database: ${err.message}`);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
