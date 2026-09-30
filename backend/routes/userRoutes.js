const express = require("express");

const {
  getUsers,
  addUser,
  toggleSync,
} = require("../controllers/userController");

const router = express.Router();

router.get("/", getUsers);
router.post("/", addUser);
router.patch("/:id/sync", toggleSync);

module.exports = router;