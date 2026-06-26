const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");

const {
  getDashboard,
  addUser,
  addStore,
  getUsers,
  getStores,
  searchUsers,
  searchStores,
} = require("../controllers/adminController");

router.get(
  "/dashboard",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getDashboard
);

router.post(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addUser
);

router.post(
  "/stores",
  authMiddleware,
  roleMiddleware("ADMIN"),
  addStore
);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getUsers
);

router.get(
  "/stores",
  authMiddleware,
  roleMiddleware("ADMIN"),
  getStores
);

router.get(
  "/users/search",
  authMiddleware,
  roleMiddleware("ADMIN"),
  searchUsers
);

router.get(
  "/stores/search",
  authMiddleware,
  roleMiddleware("ADMIN"),
  searchStores
);

module.exports = router;