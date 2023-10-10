const express = require("express");
const router = express.Router();
const {
  addMedicalCon,
  getAllMedicalCon,
  updateMedicalCon,
  deleteMedicalCon,
  deleteMultMedicalCon,
  updateMedicalConStatus,
} = require("../../controllers/Admin/settingController");
const authenticAdmin = require("../../helper/verifyAdminToken");

router.post("/addMedicalCon", authenticAdmin, addMedicalCon);
router.get("/getAllMedicalCon", authenticAdmin, getAllMedicalCon);
router.put("/updateMedicalCon/:id", authenticAdmin, updateMedicalCon);
router.delete("/deleteMedicalCon/:id", authenticAdmin, deleteMedicalCon);
router.delete("/deleteMultMedicalCon", authenticAdmin, deleteMultMedicalCon);
router.put("/updateMedicalConStatus/:id", authenticAdmin, updateMedicalConStatus);

module.exports = router;
