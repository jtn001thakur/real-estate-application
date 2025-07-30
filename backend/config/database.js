const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()

const connectDb = () => {
  try {
    mongoose.connect(
      process.env.MONGODB_URI
    );
    console.log("Database is connected");
  } catch (err) {
    res.status(501).json({ message: "Database Error", success: false });
    console.log(err)
  }
};

module.exports = { connectDb };
