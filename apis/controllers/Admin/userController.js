const express = require("express");
const User = require("../../models/User");
const {
  successResponse,
  deleteResponse,
  queryErrorRelatedResponse,
  createResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");
const deleteFiles = require("../../helper/deleteFiles");
const CalCronData = require("../../models/CalCronData");
const mealSettings = require("../../models/MealSettings");
const { getMealTimewiseRecipes } = require("../../helper/commonServices");
const NutritionSettings = require("../../models/NutritionSettings");
const TrackedMeal = require("../../models/TrackedMeal");
const { formatDate } = require("../../helper/formatterFiles");
const moment = require("moment");
// Get All User
const AllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    successResponse(res, users);
  } catch (error) {
    next(error);
  }
};

// Delete User
const DeleteUser = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const user = await User.findById(id);
    if (!user) return queryErrorRelatedResponse(req, res, 404, "User not found.");
    deleteFiles(user.image);
    await User.deleteOne({ _id: id });
    deleteResponse(res, "User deleted successfully.");
  } catch (error) {
    next(error);
  }
};

// Delete a multiple banner  or sub banner  with there Id's
const deleteMultiUser = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      const user = await User.findById(id);
      deleteFiles(user.image);
      await User.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected users deleted successfully.");
  } catch (error) {
    next(error);
  }
};

//Update User Status
const updateUserStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const user = await User.findById(id);
    if (!user) return queryErrorRelatedResponse(req, res, 404, "User not found.");
    user.status = !user.status;
    const result = await user.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update User Profile
const updateUserProfile = async (req, res, next) => {
  try {
    //Find Banner by params id
    const user = await User.findById(req.params.id);
    // Checking for banner exist with authenticate(JWT) token and params id
    if (!user) return queryErrorRelatedResponse(req, res, 404, "User not found.");

    const updatedData = req.body;

    const dateOfBirth = new Date(req.body.dob);
    updatedData.dob = dateOfBirth.getTime();
    updatedData.image = user.image;
    if (req.file) {
      deleteFiles(user.image);
      updatedData.image = req.file.filename;
    }

    const isUpdate = await User.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const updatedUser = await User.findById(req.params.id);
    successResponse(res, updatedUser);
  } catch (err) {
    next(err);
  }
};

const addUser = async (req, res, next) => {
  try {
    const addedUser = req.body;

    const dateOfBirth = new Date(req.body.dob);
    addedUser.dob = dateOfBirth.getTime();
    addedUser.password = "123456";

    if (req.file) {
      addedUser.image = req.file.filename;
    }

    const newUser = await new User(addedUser);

    const newu = await newUser.save();

    //save User and response
    createResponse(res, newu);
  } catch (err) {
    next(err);
  }
};

const getMicronutrition = async (recipesData, totalCalory, mealPer) => {
  const recipes = recipesData.recipes;

  const reduceNutrient = (nutrient) =>
    recipes.reduce((totalCalories, recipe) => totalCalories + parseFloat(recipe[nutrient]), 0);

  const UsedProteinCalory = reduceNutrient("protine");
  const UsedFatCalory = reduceNutrient("fats");
  const UsedCarbCalory = reduceNutrient("carbs");
  const UsedFibreCalory = reduceNutrient("fiber");

  const cal_per = Math.round((recipesData.totalUsedCalories * 100) / totalCalory);

  const nutritionPer = await NutritionSettings.findOne();
  const macronutrients = {
    protine: calculateNutrient("protein", totalCalory, nutritionPer, UsedProteinCalory),
    fats: calculateNutrient("fat", totalCalory, nutritionPer, UsedFatCalory),
    carbs: calculateNutrient("carb", totalCalory, nutritionPer, UsedCarbCalory),
    fibre: calculateNutrient("fibre", totalCalory, nutritionPer, UsedFibreCalory),
  };

  return macronutrients;
};

const calculateNutrient = (nutrient, totalCalory, nutritionPer, usedCalory) => {
  const totalNutrientCalory = ((totalCalory * nutritionPer[nutrient]) / 100 / (nutrient === "fibre" ? 1 : 4)).toFixed(
    1
  );
  const percent = Math.round((usedCalory * 100) / totalNutrientCalory);

  return {
    total: totalNutrientCalory,
    used: usedCalory.toFixed(1),
    percent: percent,
  };
};

//Get All Tracked Meal
const getAllTrackedMeal = async (req, res, next) => {
  try {
    const { userid, date } = req.body;
    const requestDate = moment(date, "MM/DD/YYYY").toDate();

    // Query the database for matching documents
    const results = await CalCronData.find({ userId: userid }).lean();

    // Filter results based on date matching (ignoring time)
    const matchingResults = results.filter((result) => {
      const storedDate = moment(result.date).startOf("day").toDate(); // Set time to 00:00:00
      return moment(requestDate).isSame(storedDate, "day");
    });

    let user_cal = 0;
    if (matchingResults.length > 0) {
      user_cal = matchingResults[0].cal;
    } else {
      const user_id = new mongoose.Types.ObjectId(userid);
      const user = await User.findById(user_id);
      user_cal = user.cal;
    }

    const mealPer = await mealSettings.findOne();

    let totalBreakfastCalory = 0;
    let totalMorningCalory = 0;
    let totalLunchCalory = 0;
    let totalEveningCalory = 0;
    let totalDinnerCalory = 0;

    if (mealPer) {
      totalBreakfastCalory = parseInt((user_cal * mealPer.breakfast) / 100);
      totalMorningCalory = parseInt((user_cal * mealPer.morning_snack) / 100);
      totalLunchCalory = parseInt((user_cal * mealPer.lunch) / 100);
      totalEveningCalory = parseInt((user_cal * mealPer.evening_snack) / 100);
      totalDinnerCalory = parseInt((user_cal * mealPer.dinner) / 100);
    }

    // const bf_recipes = await getMealTimewiseRecipes(date, userid, 1);
    // const mo_recipes = await getMealTimewiseRecipes(date, userid, 2);
    // const lunch_recipes = await getMealTimewiseRecipes(date, userid, 3);
    // const eve_recipes = await getMealTimewiseRecipes(date, userid, 4);
    // const dinner_recipes = await getMealTimewiseRecipes(date, userid, 5);

    const [bf_recipes, mo_recipes, lunch_recipes, eve_recipes, dinner_recipes] = await Promise.all([
      getMealTimewiseRecipes(date, userid, 1),
      getMealTimewiseRecipes(date, userid, 2),
      getMealTimewiseRecipes(date, userid, 3),
      getMealTimewiseRecipes(date, userid, 4),
      getMealTimewiseRecipes(date, userid, 5),
    ]);

    const bf_macronutrients = await getMicronutrition(bf_recipes, totalBreakfastCalory, mealPer.breakfast);
    const morning_macronutrients = await getMicronutrition(mo_recipes, totalMorningCalory, mealPer.morning_snack);
    const lunch_macronutrients = await getMicronutrition(lunch_recipes, totalLunchCalory, mealPer.lunch);
    const eve_macronutrients = await getMicronutrition(eve_recipes, totalEveningCalory, mealPer.evening_snack);
    const dinner_macronutrients = await getMicronutrition(dinner_recipes, totalDinnerCalory, mealPer.dinner);

    // Assuming you have a `baseUrl` variable
    const baseUrl = req.protocol + "://" + req.get("host") + process.env.BASE_URL_RECIPES_PATH; // Replace with your actual base URL

    const totalBfUsedCalory = parseInt(bf_recipes.totalUsedCalories);
    const breakfastData = {
      totalCalory: totalBreakfastCalory,
      totalUsedCalories: totalBfUsedCalory,
      cal_per: Math.round((totalBfUsedCalory * 100) / totalBreakfastCalory),
      receipes: bf_recipes.recipes,
      macronutrients: bf_macronutrients,
    };
    const totalmoUsedCalory = parseInt(mo_recipes.totalUsedCalories);
    const morningData = {
      totalCalory: totalMorningCalory,
      totalUsedCalories: totalmoUsedCalory,
      cal_per: Math.round((totalmoUsedCalory * 100) / totalMorningCalory),
      receipes: mo_recipes.recipes,
      macronutrients: morning_macronutrients,
    };

    const totalLunchUsedCalory = parseInt(lunch_recipes.totalUsedCalories);
    const lunchData = {
      totalCalory: totalLunchCalory,
      totalUsedCalories: totalLunchUsedCalory,
      cal_per: Math.round((totalLunchUsedCalory * 100) / totalLunchCalory),
      receipes: lunch_recipes.recipes,
      macronutrients: lunch_macronutrients,
    };

    const totalEveningUsedCalory = parseInt(eve_recipes.totalUsedCalories);
    const eveningData = {
      totalCalory: totalEveningCalory,
      totalUsedCalories: totalEveningUsedCalory,
      cal_per: Math.round((totalEveningUsedCalory * 100) / totalEveningCalory),
      receipes: eve_recipes.recipes,
      macronutrients: eve_macronutrients,
    };

    const totalDinnerUsedCalory = parseInt(dinner_recipes.totalUsedCalories);
    const dinnerData = {
      totalCalory: totalDinnerCalory,
      totalUsedCalories: totalDinnerUsedCalory,
      cal_per: Math.round((totalDinnerUsedCalory * 100) / totalDinnerCalory),
      receipes: dinner_recipes.recipes,
      macronutrients: dinner_macronutrients,
    };

    const recipes = {
      breakfast: breakfastData,
      morning: morningData,
      lunch: lunchData,
      evening: eveningData,
      dinner: dinnerData,
    };

    const totalUsedCal =
      totalBfUsedCalory + totalmoUsedCalory + totalLunchUsedCalory + totalEveningUsedCalory + totalDinnerUsedCalory;

    const allRecipes = await getMealTimewiseRecipes(date, userid);

    const totalMacronutrientsawait = await getMicronutrition(allRecipes, user_cal, 100);

    const finalResponse = {
      recipes: recipes,
      baseUrl: baseUrl,
      totalCal: parseInt(user_cal),
      totalUsedCal: parseInt(totalUsedCal),
      cal_per: Math.round((totalUsedCal * 100) / user_cal),
      macronutrients: totalMacronutrientsawait,
    };

    successResponse(res, finalResponse);
  } catch (err) {
    next(err);
  }
};

// Get last 10 Signup Users
const getLastUsers = async (req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: "descending" }).limit(10);
    successResponse(res, users);
  } catch (error) {
    next(error);
  }
};

// API endpoint to get the total count of active and inactive users
const getStatuswiseUserCount = async (req, res, next) => {
  try {
    const users = await User.find();
    const activeCount = users.filter((user) => user.status).length;
    const inactiveCount = users.length - activeCount;

    const result = { activeCount: activeCount, inactiveCount: inactiveCount };
    successResponse(res, result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  AllUsers,
  DeleteUser,
  deleteMultiUser,
  updateUserStatus,
  updateUserProfile,
  addUser,
  getAllTrackedMeal,
  getLastUsers,
  getStatuswiseUserCount,
};
