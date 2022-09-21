const express = require("express");
const router = express.Router();
const { createPlace, getPlaces } = require("../controllers/placeController");

router.get("/places", getPlaces);
router.post("/add/place", createPlace);
module.exports = router;
