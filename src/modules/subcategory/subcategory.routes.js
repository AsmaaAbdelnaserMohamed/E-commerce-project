import express from "express";
import { validation } from "../../middleware/validation.js";
import {
  addSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
} from "./subcategory.controller.js";
import {
  addsubCategorySchemaval,
  paramsIdVal,
  updatesubCategorySchemaval,
} from "./subcategory.validation.js";
const subcategoryRouter = express.Router({ mergeParams: true });
subcategoryRouter
  .route("/")
  .post(validation(addsubCategorySchemaval), addSubCategory)
  .get(getAllSubCategories);

subcategoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleSubCategory)
  .put(validation(updatesubCategorySchemaval), updateSubCategory)
  .delete(validation(paramsIdVal), deleteSubCategory);
export default subcategoryRouter;
