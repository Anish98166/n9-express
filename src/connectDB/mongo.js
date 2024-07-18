import mongoose from "mongoose";

const connectMongoDB = () => {
  mongoose.connect("mongodb://localhost:27017/n9");
  console.log("Connected to MongoDB Database");
};

export default connectMongoDB;
