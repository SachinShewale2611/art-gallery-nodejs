const { body } = require("express-validator");

exports.artworkValidator = [
  body("title")
    .notEmpty()
    .withMessage("Title is required")
    .isLength({ min: 5, max: 50 })
    .withMessage("Title is should be between 5 and 50 characters"),

  body("description")
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ min: 10, max: 200 })
    .withMessage("Description is should be between 10 and 200 characters"),

  body("photoUrls").notEmpty().withMessage("Photo URL is required"),
  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("Price should be a valid number"),
];
