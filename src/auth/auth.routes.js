import express from "express";
import { validation } from "../middleware/validation.js";
import { checkEmailExist } from "../middleware/checkEmailExist.js";
import { changePassword, protectedRoutes, signUp, signin } from "./auth.controller.js";
import { changePasswordVal, signinSchemaval, signupSchemaval } from "./auth.validation.js";
const authRouter = express.Router()

authRouter.post('/signup', validation(signupSchemaval),checkEmailExist, signUp)
authRouter.post('/signin', validation(signinSchemaval), signin)
authRouter.patch('/changePassword',protectedRoutes,validation(changePasswordVal), changePassword)


export default authRouter