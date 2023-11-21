exports.getAllUsers = (req, res) => {
  const users = { name: "John Doe", age: "25" };

  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
};
