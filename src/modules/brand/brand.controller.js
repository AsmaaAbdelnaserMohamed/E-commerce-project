import slugify from "slugify";
import { catchError } from "../../middleware/catchError.js";
import { brandModel } from "../../../database/models/brand.model.js";
import { deleteOne } from "../handlers/handlers.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";

export const addBrand = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name);
  req.body.logoImage = req.file.filename;
  console.log(req.file);
  let brand = new brandModel(req.body);
  console.log(brand);
  await brand.save();
  res.json({ message: "success", brand });
});

export const getAllBrands = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(brandModel.find(), req.query)
    .pagination()
    .fields()
    .sort()
    .search()
    .filter();
  let brands = await apiFeatures.mongooseQuery;
  res.json({ message: "success", page: apiFeatures.pageNumber, brands });
});

export const getSingleBrand = catchError(async (req, res, next) => {
  let brand = await brandModel.findById(req.params.id);
  !brand && res.status(404).json({ message: "brand not found.....!" });
  brand && res.json({ message: "success", brand });
});

export const updateBrand = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  if (req.file) req.body.logoImage = req.file.filename;
  let brand = await brandModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !brand && res.status(404).json({ message: "brand not found.....!" });
  brand && res.json({ message: "success", brand });
});

export const deleteBrand = deleteOne(brandModel);
