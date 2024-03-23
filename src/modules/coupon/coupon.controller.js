import { couponModel } from "../../../database/models/coupon.model.js";
import { catchError } from "../../middleware/catchError.js";
import { AppError } from "../../utils/AppError.js";
import { ApiFeatures } from './../../utils/ApiFeatures.js';
import { deleteOne } from './../handlers/handlers.js';


export const addCoupon = catchError(async (req, res, next) => {
  let isCouponExist = await couponModel.findOne({ code: req.body.code })
  if (isCouponExist) return next(new AppError('Coupon already Exist.....!', 401))
  req.body.createdBy = req.user._id;
  let coupon = new couponModel(req.body);
  await coupon.save();
  res.json({ message: "success", coupon });
});

export const getAllCoupons = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(couponModel.find(), req.query)
    .pagination()
    .fields()
    .sort()
    .search()
    .filter();
  let coupons = await apiFeatures.mongooseQuery;
  res.json({ message: "success", page: apiFeatures.pageNumber, coupons });
});

export const getSingleCoupon = catchError(async (req, res, next) => {
  let coupon = await couponModel.findById(req.params.id);
  !coupon && res.status(404).json({ message: "coupon not found.....!" });
  coupon && res.json({ message: "success", coupon });
});

export const updateCoupon = catchError(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  let coupon = await couponModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !coupon && res.status(404).json({ message: "coupon not found.....!" });
  coupon && res.json({ message: "success", coupon });
});

export const deleteCoupon = deleteOne(couponModel);



