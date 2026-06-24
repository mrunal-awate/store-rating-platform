const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getDashboard,
  addUser,
  addStore,
  getUsers,
  getStores
} = require("../controllers/adminController");


router.post(
  "/stores",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addStore
);

module.exports = router;