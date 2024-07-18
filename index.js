import express, { json } from "express";
import connectMongoDB from "./src/connectDB/mongo.js";
import userRouter from "./src/routes/userRouter.js";
import productRouter from "./src/routes/productRouter.js";
import webUserRouter from "./src/routes/webUserRouter.js";
import cors from "cors";
import fileRouter from "./src/routes/sendfileRouter.js";

//make express application
const myApp = express();
myApp.use(express.static("./public")); //make public folder static for read files
connectMongoDB(); // connect to Database

myApp.use(json()); //read json file
myApp.use(cors());

myApp.use("/user", userRouter);
myApp.use("/product", productRouter);
myApp.use("/web-user", webUserRouter);
myApp.use("/files", fileRouter);

myApp.listen(3000, () => {
  console.log("express is running on port 3000");
});

//Schema
//model
//controller
//routes
//index
