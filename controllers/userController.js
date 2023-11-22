const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();

  res.status(200).json({
    status: "success",
    results: users?.length,
    data: {
      users,
    },
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const newUser = await User.create({ email, password });
  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});
