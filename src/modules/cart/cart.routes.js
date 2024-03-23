import express from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { addCartSchemaval, paramsIdVal, updateQuaSchemaval } from "./cart.validation.js";
import { addToCart, getLoggedUserToCart, removeItemFromCart, updateQuantity, clearUserCart, applyCoupon } from "./cart.controller.js";
import { validation } from './../../middleware/validation.js';


const cartRouter = express.Router();
cartRouter.post('/applyCoupon', protectedRoutes, allowedTo('user'), applyCoupon)
cartRouter
  .route("/")
  .post(protectedRoutes, allowedTo('user'), validation(addCartSchemaval), addToCart)
  .get(protectedRoutes, allowedTo('user'), getLoggedUserToCart)
  .delete(protectedRoutes, allowedTo('user'), clearUserCart);
cartRouter
  .route("/:id")
  // .get(validation(paramsIdVal), getSingleCoupon)
  .put(protectedRoutes, allowedTo('user'), validation(updateQuaSchemaval), updateQuantity)
  .delete(protectedRoutes, allowedTo('user', 'admin'), validation(paramsIdVal), removeItemFromCart);
export default cartRouter;
