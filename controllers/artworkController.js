const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Artwork = require("../models/artworkModel");

const getAllArtworks = catchAsync(async (req, res) => {
  const artworks = await Artwork.find({ isDeleted: { $ne: true } });
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

const createArtwork = catchAsync(async (req, res) => {
  const owner = req.user._id;
  const artwork = await Artwork.create({ ...req.body, owner });
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
