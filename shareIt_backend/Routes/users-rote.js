const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const { getUsers, signUp, logIn } = require("../Controllers/usersController");

router.get("/", getUsers);
router.post(
  "/signup",
  [
    check("name").isLength({min:3}),
    check("name").isLength({max:9}),
    check("email").isEmail(),
    check("password").isLength({ min: 5 }),
  ],
  signUp
);
router.post("/login", logIn);

// router.get("/:userId/places",getPlaceByUserId)

// router.post("/",createPlace)

// router.patch('/:placeId',updatePlace)
// router.delete('/:placeId',deletePlace)

module.exports = router;
