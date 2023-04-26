import responseHandler from "../handlers/response.handler.js";
import reviewModel from "../models/reviewModel.js";

export const createReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = new reviewModel({
      user: req.user.id,
      reviewId,
      ...req.body,
    });

    await review.save();

    responseHandler.created(res, {
      ...review._doc,
      id: review.id,
      user: req.user,
    });
  } catch {
    responseHandler.error(res);
  }
};

export const removeReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user.id,
    });

    if (!review) return responseHandler.notFound(res);

    await review.deleteOne();
    responseHandler.ok(res, review);
  } catch {
    responseHandler.error(res);
  }
};

export const getReviewOfUser = async (req, res) => {
  try {
    const reviews = await reviewModel
      .find({
        user: req.user.id,
      })
      .sort("-createdAt");

    responseHandler.ok(res, reviews);
  } catch {
    responseHandler.error(res);
  }
};
