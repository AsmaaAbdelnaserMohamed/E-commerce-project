import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { userModel } from "../../database/models/user.model.js";
import { AppError } from "../utils/AppError.js";
import { catchError } from "../middleware/catchError.js";
// signUp
const signUp = catchError(async (req, res) => {
  let user = new userModel(req.body);
  await user.save();
  let token = jwt.sign(
    { userID: user._id, email: user.email },
    process.env.JWT_KEY
  );
  return res.json({ message: "success", token });
});

// signin
const signin = catchError(async (req, res, next) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userID: user._id, email: user.email },
      process.env.JWT_KEY
    );
    return res.json({ message: "success", token });
  }
  return next(new AppError("incorrect email or password", 401));
});

// changePassword
const changePassword = catchError(async (req, res, next) => {
  let user = await userModel.findById(req.user._id);
  if (user && bcrypt.compareSync(req.body.password, user.password)) {
    let token = jwt.sign(
      { userID: user._id, email: user.email },
      process.env.JWT_KEY
    );
    await userModel.findByIdAndUpdate(req.user._id, {
      password: req.body.newPassword,
      passwordChangedAt: Date.now(),
    });
    return res.json({ message: "success", token });
  }
  return next(new AppError("incorrect email or password", 401));
});

// authentication By protected Routes middleware
const protectedRoutes = catchError(async (req, res, next) => {
  //check token exist or not
  let { token } = req.headers;
  if (!token) return next(new AppError("token not provided", 401));

  //verify token
  let decoded = jwt.verify(token, process.env.JWT_KEY);
  //user exist or not
  let user = await userModel.findById(decoded.userID);
  if (!user) return next(new AppError("user not found", 401));
  //change user password
  if (user.passwordChangedAt) {
    let time = parseInt(user.passwordChangedAt.getTime() / 1000);
    // console.log(time + " | " + decoded.iat);
    if (time > decoded.iat)
      return next(new AppError("invalid token .....please login again"));
  }
  req.user = user;

  next();
});

const allowedTo = (...roles) => {
  return catchError(async (req, res, next) => {
    if (!roles.includes(req.user.role))
      // console.log(roles);
      // console.log(req.user.roles);
      return next(new AppError("you are not authorized and not have permeation", 401));

    next();
  });
};
export { signUp, signin, changePassword, protectedRoutes, allowedTo };
