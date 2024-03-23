import express from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { addCouponSchemaval, paramsIdVal, updateCouponSchemaval } from "./coupon.validation.js";
import { addCoupon, deleteCoupon, getAllCoupons, getSingleCoupon, updateCoupon } from "./coupon.controller.js";

const couponRouter = express.Router();
couponRouter.use(protectedRoutes,allowedTo('admin'))
couponRouter
  .route("/")
  .post(
    validation(addCouponSchemaval),
    addCoupon
  )
  .get(getAllCoupons);

couponRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleCoupon)
  .put(
    validation(updateCouponSchemaval),
    updateCoupon
  )
  .delete(validation(paramsIdVal),deleteCoupon);
export default couponRouter;
