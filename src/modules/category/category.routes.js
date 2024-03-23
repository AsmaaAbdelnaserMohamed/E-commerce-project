import express from "express";
import {
  addCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from "./category.controller.js";
import { validation } from "../../middleware/validation.js";
import {
  addCategorySchemaval,
  paramsIdVal,
  updateCategorySchemaval,
} from "./category.validation.js";
import { uploadSingleFile } from "../../../fileUpload/upload.js";
import subcategoryRouter from "../subcategory/subcategory.routes.js";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
const categoryRouter = express.Router();
categoryRouter.use("/:category/subcategories/", subcategoryRouter);
categoryRouter
  .route("/")
  .post(
    protectedRoutes,allowedTo('admin'),
    uploadSingleFile("img"),
    validation(addCategorySchemaval),
    addCategory
  )
  .get(getAllCategory);

categoryRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleCategory)
  .put(
    uploadSingleFile("img"),
    validation(updateCategorySchemaval),
    updateCategory
  )
  .delete(validation(paramsIdVal), deleteCategory);
export default categoryRouter;
