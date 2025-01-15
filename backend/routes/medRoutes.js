const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  createMed,
  getMed,
  updateMed,
  getAllMedsByCode,
} = require("../controllers/medController");

router.post("/", protect, createMed);
router.put("/", protect, updateMed);
router.get("/:codigoItem/:codigoFarmacia?", getMed);
router.post("/meds", getAllMedsByCode);

module.exports = router;
