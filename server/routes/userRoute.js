import express from "express";
import { getInfo, updatePassword } from "../controllers/userController.js";
import verifyToken from "../middleware/token.middleware.js";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";
import {
  addFavorite,
  getFavoriteOfUser,
  removeFavorite,
} from "../controllers/favoriteController.js";

const userRoute = express.Router();

userRoute.put(
  "/update",
  verifyToken.auth,
  body("password")
    .exists()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password minium 8 characters"),
  body("newPassword")
    .exists()
    .withMessage("new password is required")
    .isLength({ min: 8 })
    .withMessage("new password minium 8 characters"),
  body("confirmNewPassword")
    .exists()
    .withMessage("confirm new password is required1")
    .isLength({ min: 8 })
    .withMessage("confirm new password minium 8 characters")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword)
        throw new Error("confirm new password not match");
      return true;
    }),
  requestHandler.validate,
  updatePassword
);

userRoute.get("/getInfo", verifyToken.auth, getInfo);
userRoute.get("/favorite", verifyToken.auth, getFavoriteOfUser);

userRoute.post(
  "/favorite",
  verifyToken.auth,
  body("mediaType")
    .exists()
    .withMessage("media type is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("media type invalid"),
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId can not be empty"),
  body("mediaTitle").exists().withMessage("title is required"),
  body("mediaPoster").exists().withMessage("poster is required"),
  body("mediaRate").exists().withMessage("rate is required"),
  requestHandler.validate,
  addFavorite
);

userRoute.delete("/favorite/:favoriteId", verifyToken.auth, removeFavorite);

export default userRoute;
