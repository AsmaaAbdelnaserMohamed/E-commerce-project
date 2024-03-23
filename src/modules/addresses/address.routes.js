import express from "express";
import { allowedTo, protectedRoutes } from "../../auth/auth.controller.js";
import { validation } from "../../middleware/validation.js";
import { addAddressSchemaval, paramsIdVal } from './address.validation.js';
import { addAddress, getLoggedUserToAddress, removeAddress } from "./address.controller.js";


const addressRouter = express.Router();
addressRouter
  .route("/")
  .patch(
    protectedRoutes, allowedTo('user'),
    validation(addAddressSchemaval), addAddress
  )
  .get(protectedRoutes, allowedTo('user', 'admin'), getLoggedUserToAddress);

addressRouter
  .route("/:id")
  .delete(protectedRoutes, allowedTo('user', 'admin'), validation(paramsIdVal), removeAddress);
export default addressRouter;
