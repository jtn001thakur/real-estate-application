const User = require("../models/User");

const getUsers = async (req, res) => {
  try {
    const data = await User.find();
    const userData = await data.json();
    res.status(200).json({
      success: true,
      data: userData,
      message: "users fetched successfully",
    });
  } catch (err) {
    console.log("error in getUsers : ", err);
    res.status(500).json({
      success: false,
      message: "failed to fetch users",
    });
  }
};

const createUser = async (req, res) => {
  try {
    const { userName, email, password, role, phone } = req.body;

    if (!userName || !email || !password || !role || !phone) {
      return res.status(400).json({
        success: false,
        message: "all fields are required",
      });
    }

    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(409).json({
        success: false,
        message: "email already exists",
      });
    }
    const data = await User.create({
      userName,
      email,
      password,
      role,
      phone,
    });
    return res.status(201).json({
      success: true,
      data: data,
      message: "user created successfully",
    });
  } catch (err) {
    console.log("error in createUser : ", err);
    return res.status(500).json({
      success: false,
      message: "failed to create user",
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userData = req.body;

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "id is required",
      });
    }

    if (!userData || Object.keys(userData).length === 0) {
      return res.status(400).json({
        success: false,
        message: "updated data is required",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(id, userData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "error in updating user",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "user id is required",
      });
    }
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "user not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "user deleted",
      data: deletedUser,
    });
  } catch (err) {
    console.log("error in deleting user : ", err);
    res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

module.exports = { getUsers, createUser, updateUser, deleteUser };
