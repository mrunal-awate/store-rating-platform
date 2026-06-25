const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
  getAllStores,
  searchStores
} = require("../controllers/storeController");

router.get(
  "/",
  authMiddleware,
  getAllStores
);

router.get(
  "/search",
  authMiddleware,
  searchStores
);

module.exports = router;