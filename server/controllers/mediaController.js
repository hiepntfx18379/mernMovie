import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/userMode.js";
import favoriteModel from "../models/favoriteModel.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import tokenMiddleware from "../middleware/token.middleware.js";
import reviewModel from "../models/reviewModel.js";

export const getList = async (req, res) => {
  try {
    const { page } = req.query;
    const { mediaType, mediaCategory } = req.params;
    const response = await tmdbApi.mediaList({
      mediaType,
      mediaCategory,
      page,
    });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export const getGenres = async (req, res) => {
  try {
    const { mediaType } = req.query;
    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export const search = async (req, res) => {
  try {
    const { page, query } = req.query;
    const { mediaType } = req.params;
    const response = await tmdbApi.mediaSearch({
      mediaType: mediaType === "people" ? "person" : mediaType,
      query,
      page,
    });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export const getDetail = async (req, res) => {
  try {
    console.log("detail");
    const { mediaType, media_id } = req.params;
    const params = { mediaType, media_id };

    console.log("params: ", params);
    const media = await tmdbApi.mediaDetail(params);

    const credits = await tmdbApi.mediaCredits(params);

    media.credits = credits;

    const videos = await tmdbApi.mediaVideos(params);
    media.videos = videos;

    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend = recommend.results;

    const images = await tmdbApi.mediaImages(params);
    media.images = images;

    const user = await userModel.findById(req.user.id);

    if (user) {
      const isFavorite = await favoriteModel.findOne({
        user: user.id,
        media_id,
      });
      console.log("isFavorite: ", isFavorite);
      media.isFavorite = isFavorite !== null;
    }

    const review = await reviewModel
      .find({ media_id })
      .populate("user")
      .sort("-createdAt");

    media.review = review;
    return responseHandler.ok(res, media);
  } catch {
    responseHandler.error(res);
  }
};
