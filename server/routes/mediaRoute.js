import express from "express";
import {
  getGenres,
  getList,
  search,
  getDetail,
} from "../controllers/mediaController.js";

const mediaRoute = express.Router({ mergeParams: true });

mediaRoute.get("/genres", getGenres);
mediaRoute.get("/search", search);
mediaRoute.get("/getDetail/:media_id", getDetail);
mediaRoute.get("/:mediaCategory", getList);

export default mediaRoute;
