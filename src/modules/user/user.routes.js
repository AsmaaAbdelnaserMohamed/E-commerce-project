import express from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { addUserVal, paramsIdVal, updateUserSchemaval } from './user.validation.js';
import { validation } from "../../middleware/validation.js";
import { addUser, deleteUser, getAllUsers, getSingleUser, updateUser } from "./user.controller.js";
const userRouter = express.Router();
userRouter
  .route("/")
  .post(
    protectedRoutes,allowedTo('admin'),
    validation(addUserVal),
    addUser
  )
  .get(getAllUsers);

userRouter
  .route("/:id")
  .get(validation(paramsIdVal), getSingleUser)
  .put(protectedRoutes,allowedTo('admin'),
    validation(updateUserSchemaval),
    updateUser
  )
  .delete(protectedRoutes,allowedTo('user','admin'),validation(paramsIdVal), deleteUser);
export default userRouter;
