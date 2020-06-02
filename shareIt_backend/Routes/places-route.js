const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
  getPlaceById,
  getPlaceByUserId,
  createPlace,
  updatePlace,
  deletePlace,
} = require("../Controllers/placesController");

router.get("/:placeid", getPlaceById);

router.get("/:userId/places", getPlaceByUserId);

router.post(
  "/",
  [
    check("title").not().isEmpty(),
    check("description").isLength({ min: 20 }),
    check("address").not().isEmpty(),
  ],
  createPlace
);

router.patch(
  "/:placeId",
  [check("title").not().isEmpty(), check("description").isLength({ min: 20 })],
  updatePlace
);
router.delete("/:placeId", deletePlace);

module.exports = { router };
