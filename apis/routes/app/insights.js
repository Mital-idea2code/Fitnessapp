const express = require("express");
const router = express.Router();
const {
  addMeal,
  getAllTrackedMeal,
  getEatenCal,
  getAllCalBudget,
  getMealwiseCalBudget,
} = require("../../controllers/App/insightController");
const verifyToken = require("../../helper/verifyAppToken");

router.post("/addMeal", verifyToken, addMeal);
router.post("/getAllTrackedMeal", verifyToken, getAllTrackedMeal);
router.post("/getEatenCal", verifyToken, getEatenCal);
router.post("/getAllCalBudget", verifyToken, getAllCalBudget);
router.post("/getMealwiseCalBudget", verifyToken, getMealwiseCalBudget);

module.exports = router;
