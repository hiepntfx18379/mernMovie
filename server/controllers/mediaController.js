import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/userMode.js";
import favoriteModel from "../models/favoriteModel.js";
import tmdbApi from "../tmdb/tmdb.api.js";
import tokenMiddleware from "../middleware/token.middleware.js";
import * as fs from "fs";

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
    const { mediaType } = req.params;
    const response = await tmdbApi.mediaGenres({ mediaType });

    return responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

export const search = async (req, res, next) => {
  try {
    const { page, query, language, year } = req.query;
    const { mediaType } = req.params;
    const response = await tmdbApi.mediaSearch({
      mediaType: mediaType === "people" ? "person" : mediaType,
      query,
      page,
      language,
      year,
    });

    if (response.results.length === 0) {
      responseHandler.badRequest(res, "Not found keyword parram");
      return;
    }

    responseHandler.ok(res, response);
  } catch {
    responseHandler.error(res);
  }
};

const getVideos = async (params) => {
  try {
    const videos = await tmdbApi.mediaVideos(params);

    if (videos.results.length === 0) {
      responseHandler.notFound(res);
      return;
    }
    return videos;
  } catch {
    responseHandler.error(res);
  }
};

function compare(a, b) {
  const tA = a.type.toUpperCase();
  const tB = b.type.toUpperCase();
  let comparison = 0;
  if (tA < tB) {
    comparison = 1;
  } else if (tA > tB) {
    comparison = -1;
  }
  return comparison;
}

export const getDetail = async (req, res) => {
  try {
    const { mediaType, media_id } = req.params;
    const params = { mediaType, media_id };
    const media = await tmdbApi.mediaDetail(params);

    const credits = await tmdbApi.mediaCredits(params);
    media.credits = credits;
    const videos = await tmdbApi.mediaVideos(params);

    const listVideos = videos.results.filter(
      (m) => m.type === "Trailer" || m.type === "Teaser",
    );
    media.videos = listVideos.sort(compare);

    const recommend = await tmdbApi.mediaRecommend(params);
    media.recommend = recommend.results;
    const images = await tmdbApi.mediaImages(params);
    media.images = images;
    const tokenUser = tokenMiddleware.tokenDecode(req);
    if (tokenUser) {
      const user = await userModel.findById(tokenUser.data);
      if (user) {
        const isFavorite = await favoriteModel.findOne({
          user: user.id,
          media_id,
        });
        media.isFavorite = isFavorite !== null;
      }
    }

    return responseHandler.ok(res, media);
  } catch {
    responseHandler.error(res);
  }
};

const loadJSON = (path) =>
  JSON.parse(
    fs.readFileSync(path, {
      encoding: "utf-8",
    }),
  );

export const searchMovieFollowGenres = async (req, res) => {
  try {
    const { mediaType, genres } = req.params;
    const listMovieData = await loadJSON("./data/movieList.json").splice(
      0,
      2000,
    );
    const data = listMovieData.filter((m) =>
      [...m.genre_ids].includes(+genres),
    );

    responseHandler.ok(res, data);
  } catch {
    responseHandler.error(res);
  }
};

export const getListVideos = async (req, res) => {
  try {
    const { mediaType, media_id } = req.params;
    const params = { mediaType, media_id };
    const videos = await tmdbApi.mediaVideos(params);

    const listVideos = videos.results.filter(
      (m) => m.type === "Trailer" || m.type === "Teaser",
    );
    if (listVideos.length === 0) {
      responseHandler.notFound(res);
      return;
    }

    return listVideos.sort(compare);
  } catch {
    responseHandler.error(res);
  }
};
