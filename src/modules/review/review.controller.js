import { reviewModel } from "../../../database/models/review.model.js";
import { catchError } from "../../middleware/catchError.js";
import { ApiFeatures } from "../../utils/ApiFeatures.js";
import { AppError } from "../../utils/AppError.js";
import { deleteOne } from "../handlers/handlers.js";

export const addReview = catchError(async (req, res, next) => {
  let isReviewExist = await reviewModel.findOne({ createdBy: req.user._id, product: req.body.product })
  if (isReviewExist) return next(new AppError('You Created Review Before', 401))
  req.body.createdBy = req.user._id;
  let review = new reviewModel(req.body);
  await review.save();
  res.json({ message: "success", review });
});

export const getAllReviews = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(reviewModel.find(), req.query)
    .pagination()
    .fields()
    .sort()
    .search()
    .filter();
  let reviews = await apiFeatures.mongooseQuery;
  res.json({ message: "success", page: apiFeatures.pageNumber, reviews });
});

export const getSingleReview = catchError(async (req, res, next) => {
  let review = await reviewModel.findById(req.params.id);
  !review && res.status(404).json({ message: "review not found.....!" });
  review && res.json({ message: "success", review });
});

export const updateReview = catchError(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  let review = await reviewModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !review && res.status(404).json({ message: "review not found.....!" });
  review && res.json({ message: "success", review });
});

export const deleteReview = deleteOne(reviewModel);



