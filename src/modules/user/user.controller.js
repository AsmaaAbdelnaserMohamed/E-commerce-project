
import { userModel } from './../../../database/models/user.model.js';
import { catchError } from './../../middleware/catchError.js';
import { ApiFeatures } from './../../utils/ApiFeatures.js';
import { deleteOne } from './../handlers/handlers.js';

// export const addUser = catchError(async (req, res, next) => {
//   let user = new userModel(req.body);
//   await user.save();
//   res.json({ message: "success", user });
// });




export const addUser = catchError(async (req, res) => {
  let user = new userModel(req.body);
  await user.save();
  let token = jwt.sign(
    { userID: user._id, email: user.email },
    process.env.JWT_KEY
  );
  return res.json({ message: "success", token });
});


export const getAllUsers = catchError(async (req, res, next) => {
  let apiFeatures = new ApiFeatures(userModel.find(), req.query)
    .pagination()
    .fields()
    .sort()
    .search()
    .filter();
  let users = await apiFeatures.mongooseQuery;
  res.json({ message: "success", page: apiFeatures.pageNumber, users });
});

export const getSingleUser = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.params.id);
  !user && res.status(404).json({ message: "user not found.....!" });
  user && res.json({ message: "success", user });
});

export const updateUser = catchError(async (req, res, next) => {
  let user = await userModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  !user && res.status(404).json({ message: "user not found.....!" });
  user && res.json({ message: "success", user });
});

export const deleteUser = deleteOne(userModel);
