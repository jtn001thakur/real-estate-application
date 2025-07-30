const express = require("express");
const userRoutes = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

userRoutes.get("/users", getUsers);
userRoutes.post("/adduser", createUser);
userRoutes.put("/updateuser/:id", updateUser);
userRoutes.delete("/deleteuser/:id", deleteUser);

module.exports = userRoutes;
