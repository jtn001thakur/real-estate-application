const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();

const { connectDb } = require("./config/database");
const userRoutes = require('./routes/userRoutes')

const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.use(express.json());
app.use(morgan("dev"));

app.use("/api/users", userRoutes)

connectDb();

app.listen(port, () => {
  console.log("Server is running on : http://localhost:3000");
});
