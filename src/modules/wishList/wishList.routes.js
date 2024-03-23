import express from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { addWishListSchemaval, paramsIdVal } from "./wishList.validation.js";
import { addToWishList, getLoggedUserToWishList, removeFromWishList } from "./wishList.controller.js";

const wishListRouter = express.Router();
wishListRouter
  .route("/")
  .patch(
    protectedRoutes, allowedTo('user'),
    validation(addWishListSchemaval), addToWishList
  )
  .get(protectedRoutes, allowedTo('user'), getLoggedUserToWishList);
wishListRouter
  .route("/:id")
  .delete(protectedRoutes, allowedTo('user', 'admin'), validation(paramsIdVal), removeFromWishList);
export default wishListRouter;
