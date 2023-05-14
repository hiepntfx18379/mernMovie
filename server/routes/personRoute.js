import express from "express";
import { personDetail, personMedias } from "../controllers/personController.js";

const personRoute = express.Router({ mergeParams: true });

personRoute.get("/:personId/medias", personMedias);
personRoute.get("/id/:personId", personDetail);

export default personRoute;
