const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Enter the Name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Enter the Email"],
      trim: true,
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Provide a passsword"],
      trim: true,
      minLength: [6, "Password Length Should be 6"],
      select: false,
    },
    role: {
      type: String,
      enum: ["buyer", "seller", "admin", "admin"],
    },
    phone: {
      type: Number,
      match: [/^\+?[\d\s-()]+$/, "Provide a valid Phone number"],
    },
  },
  { timestames: true }
);

module.exports = mongoose.model("User", userSchema);
