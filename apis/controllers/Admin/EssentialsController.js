const express = require("express");
const Essentials = require("../../models/Essentials");
const EssSubcategoryLevel1 = require("../../models/EssSubcategoryLevel1");
const EssSubcategoryLevel2 = require("../../models/EssSubcategoryLevel2");

const {
  createResponse,
  successResponse,
  queryErrorRelatedResponse,
  deleteResponse,
} = require("../../helper/sendResponse");
const mongoose = require("mongoose");

//Add Essentials
const addEssentials = async (req, res, next) => {
  try {
    const addedEss = req.body;
    if (req.file) {
      addedEss.image = req.file.filename;
    }
    const newCat = await new Essentials(addedEss);

    const result = await newCat.save();
    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Essentials
const updateEssentials = async (req, res, next) => {
  try {
    const cat = await Essentials.findById(req.params.id);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    const updatedData = req.body;
    updatedData.image = cat.image;
    if (req.file) {
      deleteFiles("essentials/" + cat.image);
      updatedData.image = req.file.filename;
    }

    const isUpdate = await Essentials.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const result = await Essentials.findById(req.params.id);
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Essentials Status
const updateEssStatus = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const cat = await Essentials.findById(id);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    cat.status = !cat.status;
    const result = await cat.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Single Essentials
const deleteEssentials = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const cat = await Essentials.findById(id);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    await Essentials.deleteOne({ _id: id });
    deleteResponse(res, "Essentials deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Essentials
const deleteMultEssentials = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      await Essentials.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Get All Essentials
const getAllEssentials = async (req, res, next) => {
  try {
    const cat = await Essentials.find();
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");
    successResponse(res, cat);
  } catch (err) {
    next(err);
  }
};

//Get All Sub-Category Level 1
const getAllEssSubCat1 = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const cat = await Essentials.findById(id);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    // Get subcategories at level 1 for the specified category
    const subcategoriesLevel1 = await EssSubcategoryLevel1.find({
      _id: { $in: cat.subcategories },
    });

    successResponse(res, subcategoriesLevel1);
  } catch (err) {
    next(err);
  }
};

//Add Sub-Category Level 1
const addEssSubCatLevel1 = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const cat = await Essentials.findById(id);
    if (!cat) return queryErrorRelatedResponse(req, res, 404, "Essentials not found.");

    // Create a new subcategory at level 1
    const addedEssSub1 = req.body;
    if (req.file) {
      addedEssSub1.image = req.file.filename;
    }
    const newSubCat1 = await new EssSubcategoryLevel1(addedEssSub1);
    // Save the new subcategory
    const result = await newSubCat1.save();

    // Add the new subcategory to the category's subcategories array
    cat.subcategories.push(result);
    // Save the category with the new subcategory
    await cat.save();

    return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Update Level 1 Subacategory Status
const updateEssSubCat1Status = async (req, res, next) => {
  try {
    // Convert string is into Object id
    const id = new mongoose.Types.ObjectId(req.params.id);
    const subCat = await EssSubcategoryLevel1.findById(id);
    if (!subCat) return queryErrorRelatedResponse(req, res, 404, "Sub-category not found.");

    subCat.status = !subCat.status;
    const result = await subCat.save();
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Delete Level 1 Subacategory
const deleteEssSubCat1 = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const subcat = await EssSubcategoryLevel1.findById(id);
    if (!subcat) return queryErrorRelatedResponse(req, res, 404, "Sub-category not found.");

    await EssSubcategoryLevel1.deleteOne({ _id: id });
    deleteResponse(res, "Sub-category deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Delete Multiple Level 1 Subacategory
const deleteMultSubCat1 = async (req, res, next) => {
  try {
    const { Ids } = req.body;
    Ids.map(async (item) => {
      const id = new mongoose.Types.ObjectId(item);
      await EssSubcategoryLevel1.deleteOne({ _id: id });
    });
    deleteResponse(res, "All selected records deleted successfully.");
  } catch (err) {
    next(err);
  }
};

//Update Level 1 Subacategory
const updateEssSubCat1 = async (req, res, next) => {
  try {
    const subcat = await EssSubcategoryLevel1.findById(req.params.id);
    if (!subcat) return queryErrorRelatedResponse(req, res, 404, "Level 1 Subacategory not found.");

    const updatedData = req.body;
    updatedData.image = subcat.image;
    if (req.file) {
      deleteFiles("essentials/" + subcat.image);
      updatedData.image = req.file.filename;
    }

    const isUpdate = await EssSubcategoryLevel1.findByIdAndUpdate(req.params.id, { $set: updatedData });
    if (!isUpdate) return queryErrorRelatedResponse(req, res, 401, "Something Went wrong!!");

    const result = await EssSubcategoryLevel1.findById(req.params.id);
    return successResponse(res, result);
  } catch (err) {
    next(err);
  }
};

//Add Sub-Category Level 2
const addEssSubCatLevel2 = async (req, res, next) => {
  try {
    const id = new mongoose.Types.ObjectId(req.params.id);
    const subcat1 = await EssSubcategoryLevel1.findById(id);
    if (!subcat1) return queryErrorRelatedResponse(req, res, 404, "Essentials Level 1 Category not found.");

    console.log(req.files["video"]);
    console.log(req.files["icon"]);
    // // Create a new subcategory at level 1
    // const addedEssSub2 = req.body;
    // if (req.file) {
    //   addedEssSub2.icon = req.file.filename;
    // }
    // const newSubCat2 = await new EssSubcategoryLevel2(addedEssSub2);
    // // Save the new subcategory
    // const result = await newSubCat2.save();

    // // Add the new subcategory to the category's subcategories array
    // subcat1.subcategories.push(result);
    // // Save the category with the new subcategory
    // await subcat1.save();

    // return createResponse(res, result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  addEssentials,
  updateEssentials,
  updateEssStatus,
  deleteEssentials,
  deleteMultEssentials,
  getAllEssentials,
  getAllEssSubCat1,
  addEssSubCatLevel1,
  updateEssSubCat1Status,
  deleteEssSubCat1,
  deleteMultSubCat1,
  updateEssSubCat1,
  addEssSubCatLevel2,
};
