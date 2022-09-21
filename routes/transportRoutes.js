const express = require("express");
const {
  createTransport,
  getAllTransports,
  findTransport,
} = require("../controllers/transportController");
const router = express.Router();

router.get("/all/transports", getAllTransports);
router.post("/find/transport", findTransport);
router.post("/add/transport", createTransport);
module.exports = router;
