const express = require("express");
const {
  getMenu,
  addMenuItem,
  toggleAvailability,
  deleteMenuItem,
} = require("../controllers/menuController");

const router = express.Router();

router.get("/", getMenu);
router.post("/", addMenuItem);
router.patch("/:id/toggle", toggleAvailability);
router.delete("/:id", deleteMenuItem);

module.exports = router;
