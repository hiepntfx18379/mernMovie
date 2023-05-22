import express from "express";
import { login, register, getLanguage } from "../controllers/authController.js";
import userModel from "../models/userMode.js";
import requestHandler from "../handlers/request.handler.js";
import { body } from "express-validator";

const authRoute = express.Router();

authRoute.post(
  "/register",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username minium 8 characters")
    .custom(async (value) => {
      const user = await userModel.findOne({ username: value });
      if (user) return Promise.reject("username already used");
    }),
  body("displayName")
    .isLength({ min: 8 })
    .withMessage("display name minium 8 characters"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minium 8 characters"),
  body("confirmPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password)
        throw new Error("Confirm password not match");
      return true;
    }),
  requestHandler.validate,
  register
);

authRoute.post(
  "/login",
  body("username")
    .exists()
    .withMessage("username is required")
    .isLength({ min: 8 })
    .withMessage("username minium 8 characters"),
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minium 8 characters"),
  requestHandler.validate,
  login
);

authRoute.get("/lang", getLanguage)

export default authRoute;
