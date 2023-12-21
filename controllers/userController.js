const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllUsers = catchAsync(async (req, res) => {
  const features = new APIFeatures(User.find(), req.query)
    .paginate();

  const users = await features.query;

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
