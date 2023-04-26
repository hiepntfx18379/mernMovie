import express from "express";
import {
  getGenres,
  getList,
  search,
  getDetail,
} from "../controllers/mediaController.js";
import { verifyToken } from "../utils/verifyToken.js";

const mediaRoute = express.Router();

mediaRoute.get("/getList/:mediaType/:category", getList);
mediaRoute.get("/genres", getGenres);
mediaRoute.get("/search/:mediaType", search);
mediaRoute.get("/getDetail/:mediaType/:media_id", verifyToken, getDetail);

export default mediaRoute;
