const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const { createMed } = require("../controllers/medController");

router.post("/", protect, createMed);

module.exports = router;
