import slugify from "slugify";
import { subCategoryModel } from "../../../database/models/subcategory.model.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";

export const addSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  let subcategory = new subCategoryModel(req.body);
  //   console.log(subcategory);
  await subcategory.save();
  res.json({ message: "success", subcategory });
});

export const getAllSubCategories = catchError(async (req, res, next) => {
  let filterObj = {};
  if (req.params.category) {
    filterObj.category = req.params.category;
  }
  let apiFeatures = new ApiFeatures(subCategoryModel.find(filterObj), req.query)
    .pagination()
    .fields()
    .sort()
    .search()
    .filter();
  let subcategories = await apiFeatures.mongooseQuery;
  res.json({ message: "success", page: apiFeatures.pageNumber, subcategories });
});

export const getSingleSubCategory = catchError(async (req, res, next) => {
  let subcategory = await subCategoryModel.findById(req.params.id);
  !subcategory &&
    res.status(404).json({ message: "subcategory not found.....!" });
  subcategory && res.json({ message: "success", subcategory });
});

export const updateSubCategory = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  let subcategory = await subCategoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !subcategory &&
    res.status(404).json({ message: "subcategory not found.....!" });
  subcategory && res.json({ message: "success", subcategory });
});

export const deleteSubCategory = deleteOne(subCategoryModel);
