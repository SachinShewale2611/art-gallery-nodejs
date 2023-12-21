const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Artwork = require("../models/artworkModel");
const APIFeatures = require("../utils/apiFeatures");
const { validationResult } = require("express-validator");

const getAllArtworks = catchAsync(async (req, res) => {
  let filter = { isDeleted: { $ne: true } };
  if (req.params.userId) filter.owner = req.params.userId;
  const features = new APIFeatures(Artwork.find(filter), req.query)
    .paginate()
    .sort();

  const artworks = await features.query;

  res.status(200).json({
    status: "success",
    results: artworks?.length,
    data: {
      artworks,
    },
  });
});

const getArtworkById = catchAsync(async (req, res, next) => {
  const artwork = await Artwork.findById(req.params.id);
  if (!artwork) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      artwork,
    },
  });
});

const createArtwork = catchAsync(async (req, res, next) => {
  const owner = req.user._id;
  //validate body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: "fail",
      errors: errors.array(),
      
    });
  }
  //end of validation
  const { title, description, photoUrls, price } = req.body;

  const artwork = await Artwork.create({
    title,
    description,
    photoUrls,
    price,
    owner,
  });
  res.status(201).json({
    status: "success",
    data: {
      artwork,
    },
  });
});

const updateArtwork = catchAsync(async (req, res, next) => {
  const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!artwork) {
    return next(new AppError("Artwork not found", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      artwork,
    },
  });
});

const deleteArtwork = catchAsync(async (req, res, next) => {
  // Soft delete the artwork
  const artwork = await Artwork.findById(req.params.id);
  if (!artwork) {
    return next(new AppError("Artwork not found", 404));
  }
  await artwork.softDelete();
  res.status(204).json({
    status: "success",
    data: null,
  });
});

// Export the controller methods
module.exports = {
  getAllArtworks,
  getArtworkById,
  createArtwork,
  updateArtwork,
  deleteArtwork,
};
