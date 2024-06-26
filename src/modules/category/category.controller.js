import slugify from "slugify";
import { categoryModel } from "./../../../database/models/category.model.js";
import { catchError } from "../../middleware/catchError.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";

export const addCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.image = req.file.filename;
  console.log(req.file);
  let category = new categoryModel(req.body);
  console.log(category);
  await category.save();
  res.json({ message: "success", category });
});

export const getAllCategory = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(categoryModel.find(), req.query)
    .pagination()
    .fields()
    .sort()
    .search()
    .filter();
  let categories = await apiFeatures.mongooseQuery;
  res.json({ message: "success", page: apiFeatures.pageNumber, categories });
});

export const getSingleCategory = catchError(async (req, res, next) => {
  let category = await categoryModel.findById(req.params.id);
  !category && res.status(404).json({ message: "category not found.....!" });
  category && res.json({ message: "success", category });
});

export const updateCategory = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.image = req.file.filename;
  let category = await categoryModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  !category && res.status(404).json({ message: "category not found.....!" });
  category && res.json({ message: "success", category });
});

export const deleteCategory = deleteOne(categoryModel);
