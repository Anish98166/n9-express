import mongoose from "mongoose";
import userSchema from "./userSchema.js";
import productSchema from "./productSchema.js";
import webUserSchema from "./webUser.js";

export const User = mongoose.model("User", userSchema);
export const Product = mongoose.model("Product", productSchema);
export const WebUser = mongoose.model("WebUser", webUserSchema);
