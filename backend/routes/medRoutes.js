const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
  createMed,
  getMed,
  updateMed,
  getAllMedsByCode,
} = require("../controllers/medController");
const {
  createTransfer,
  updateTransfer,
  getTransfers,
} = require("../controllers/transfController");

router.post("/", protect, createMed);
router.put("/", protect, updateMed);
router.get("/meds/:codigoItem/:codigoFarmacia?", getMed);
router.post("/meds", getAllMedsByCode);
router.post("/transfer", protect, createTransfer);
router.put("/transfer", protect, updateTransfer);
router.get("/transfer/all", getTransfers);

module.exports = router;
