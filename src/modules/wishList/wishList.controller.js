import { userModel } from "../../../database/models/user.model.js";
import { catchError } from "../../middleware/catchError.js";


export const addToWishList = catchError(async (req, res, next) => {
  let wishList = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { wishList: req.body.product } }, { new: true }).populate('wishList', 'title  description price imageCover ');
  !wishList && res.status(404).json({ message: "wishList not found.....!" });
  wishList && res.json({ message: "success", wishList: wishList.wishList });
});


export const removeFromWishList = catchError(async (req, res, next) => {
  let wishList = await userModel.findByIdAndUpdate(req.user._id, { $pull: { wishList: req.params.id } }, { new: true }).populate('wishList', 'title  description price imageCover');
  !wishList && res.status(404).json({ message: "wishList not found.....!" });
  wishList && res.json({ message: "success", wishList: wishList.wishList });
});


export const getLoggedUserToWishList = catchError(async (req, res, next) => {
  let { wishList } = await userModel.findById(req.user._id).populate('wishList');
  !wishList && res.status(404).json({ message: "wishList not found.....!" });
  wishList && res.json({ message: "success", wishList});
});