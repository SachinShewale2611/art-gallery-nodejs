const express = require("express");
const artworkController = require("../controllers/artworkController");
const authController = require("../controllers/authController");
const { artworkValidator } = require("../validators/artworkValidator");

const router = express.Router({ mergeParams: true });

// Define your artwork routes here
router.use(authController.protect);
router.get("/", artworkController.getAllArtworks);
router.post("/", artworkValidator, artworkController.createArtwork);
router.get("/:id", artworkController.getArtworkById);
router.patch("/:id", artworkController.updateArtwork);
router.delete("/:id", artworkController.deleteArtwork);

module.exports = router;
