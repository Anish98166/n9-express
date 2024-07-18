import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "name field is required"],
  },
  address: {
    type: String,
    required: [true, "address field is required"],
  },
  isMarried: {
    type: Boolean,
    required: [true, "isMarried field is required"],
  },
});

export default userSchema;
