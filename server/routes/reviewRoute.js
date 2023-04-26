import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {
  createReview,
  getReviewOfUser,
  removeReview,
} from "../controllers/reviewController.js";
import { body } from "express-validator";
import requestHandler from "../handlers/request.handler.js";

const reviewRoute = express.Router();

reviewRoute.post(
  "/postReview",
  verifyToken,
  body("mediaId")
    .exists()
    .withMessage("mediaId is required")
    .isLength({ min: 1 })
    .withMessage("mediaId not empty"),
  body("content")
    .exists()
    .withMessage("Content is required")
    .isLength({ min: 1 })
    .withMessage("Content not empty"),
  body("mediaType")
    .exists()
    .withMessage("mediaType is required")
    .custom((type) => ["movie", "tv"].includes(type))
    .withMessage("mediaType invalid"),
  body("mediaTitle")
    .exists()
    .withMessage("mediaTitle is required")
    .isLength({ min: 1 })
    .withMessage("mediaTitle not empty"),
  body("mediaPoster")
    .exists()
    .withMessage("mediaPoster is required")
    .isLength({ min: 1 })
    .withMessage("mediaPoster not empty"),
  requestHandler.validate,
  createReview
);

reviewRoute.delete("/delete/:reviewId", verifyToken, removeReview);

reviewRoute.get("/getReview", verifyToken, getReviewOfUser);

export default reviewRoute;
