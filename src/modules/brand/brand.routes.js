import express from "express";
import { validation } from "../../middleware/validation.js";
import { uploadSingleFile } from "../../../fileUpload/upload.js";
import { addBrandSchemaval, paramsIdVal, updateBrandSchemaval } from "./brand.validation.js";
import { addBrand, deleteBrand, getAllBrands, getSingleBrand, updateBrand } from "./brand.controller.js";
const brandRouter = express.Router();
brandRouter
  .route("/")
  .post(uploadSingleFile("img"), validation(addBrandSchemaval), addBrand)
  .get(getAllBrands);

brandRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleBrand)
  .put(
    uploadSingleFile("img"),
    validation(updateBrandSchemaval),
    updateBrand
  )
  .delete(validation(paramsIdVal), deleteBrand);
export default brandRouter;
