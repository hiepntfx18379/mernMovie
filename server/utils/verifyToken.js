import responseHandler from "../handlers/response.handler.js";
import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return responseHandler.unauthorize(res);
  }

  jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
    if (err) return responseHandler.error(res);
    req.user = user;
    next();
  });
};
