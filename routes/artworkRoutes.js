const express = require("express");
const router = express.Router();
const artworkController = require("../controllers/artworkController");
const authController = require("../controllers/authController");

// Define your artwork routes here
router.use(authController.protect);
router.get("/", artworkController.getAllArtworks);
router.get("/:id", artworkController.getArtworkById);
router.post("/", artworkController.createArtwork);
router.patch("/:id", artworkController.updateArtwork);
router.delete("/:id", artworkController.deleteArtwork);

module.exports = router;
