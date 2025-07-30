const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

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
      enum: ["buyer", "seller", "admin"],
    },
    phone: {
      type: Number,
      match: [/^\+?[\d\s-()]+$/, "Provide a valid Phone number"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
