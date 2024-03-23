import express from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { addReviewSchemaval, paramsIdVal, updateReviewSchemaval } from "./review.validation.js";
import { addReview, deleteReview, getAllReviews, getSingleReview, updateReview } from "./review.controller.js";
const reviewRouter = express.Router();
reviewRouter
  .route("/")
  .post(
    protectedRoutes,allowedTo('user'),
    validation(addReviewSchemaval),
    addReview
  )
  .get(getAllReviews);

reviewRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleReview)
  .put(protectedRoutes,allowedTo('user'),
    validation(updateReviewSchemaval),
    updateReview
  )
  .delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal), deleteReview);
export default reviewRouter;
