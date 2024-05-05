import express from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { createOrderVal } from "./order.validation.js";
import {createOnlineOrder, createOrderCash, getAllOrders, getSpecificOrder } from "./order.controller.js";

const orderRouter = express.Router();
orderRouter
  .route("/")
  // .post(protectedRoutes, allowedTo('user'), validation(addCartSchemaval), addToCart)
  .get(protectedRoutes, allowedTo('user'), getSpecificOrder)
orderRouter.get('/all', protectedRoutes, allowedTo('admin'), getAllOrders)
orderRouter.post('/checkout/:id', protectedRoutes, allowedTo('user'), validation(createOrderVal), createOnlineOrder)

// .delete(protectedRoutes, allowedTo('user'), clearUserCart);
orderRouter
  .route("/:id")
  // .get(validation(paramsIdVal), getSingleCoupon)
  .post(protectedRoutes, allowedTo('user'), validation(createOrderVal), createOrderCash)
  // .post(protectedRoutes, allowedTo('user'), validation(createOrderVal), createOnlineOrder)
// .delete(protectedRoutes, allowedTo('user', 'admin'), validation(paramsIdVal), removeItemFromCart);
export default orderRouter;
