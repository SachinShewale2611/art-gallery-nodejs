const mongoose = require("mongoose");

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxlength: [50, "Title must be at most 50 characters"],
  },
  description: {
    type: String,
    required: true,
    maxlength: [200, "Description must be at most 200 characters"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  photoUrls: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
    min: [0, "Discount must be at least 0"],
    max: [100, "Discount must be at most 100"],
  },
  isDeleted: {
    type: Boolean,
    default: false,
    select: false,
  },
});

// Soft delete middleware
artworkSchema.pre(/^findOne/, function (next) {
  // Exclude soft-deleted artworks
  this.find({ isDeleted: { $ne: true } });
  next();
});

// Method to soft delete an artwork
artworkSchema.methods.softDelete = function () {
  this.isDeleted = true;
  return this.save();
};

// get owner details with only name and photo
artworkSchema.pre(/^findOne/, function (next) {
  this.populate({
    path: "owner",
    select: "name photo",
  });
  next();
});

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;
