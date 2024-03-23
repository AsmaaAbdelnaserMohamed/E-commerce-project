import { catchError } from './../../middleware/catchError.js';
import { userModel } from './../../../database/models/user.model.js';


export const addAddress = catchError(async (req, res, next) => {
  let { addresses } = await userModel.findByIdAndUpdate(req.user._id, { $addToSet: { addresses: req.body } }, { new: true });
  !addresses && res.status(404).json({ message: "address not found.....!" });
  addresses && res.json({ message: "success", addresses });
});


export const removeAddress = catchError(async (req, res, next) => {
  let { addresses } = await userModel.findByIdAndUpdate(req.user._id, { $pull: { addresses: { _id: req.params.id } } }, { new: true });
  !addresses && res.status(404).json({ message: "address not found.....!" });
  addresses && res.json({ message: "success", addresses });
});

export const getLoggedUserToAddress = catchError(async (req, res, next) => {
  let { addresses } = await userModel.findById(req.user._id);
  !addresses && res.status(404).json({ message: "address not found.....!" });
  addresses && res.json({ message: "success", addresses });
});

// export const getLoggedUserToAddress = catchError(async (req, res, next) => {
//   let { address } = await userModel.findById(req.user._id)
//   !address && res.status(404).json({ message: "address not found.....!" });
//   address && res.json({ message: "success", address});
// });