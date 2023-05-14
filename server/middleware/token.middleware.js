import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/userMode.js";

const tokenDecode = (req) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return responseHandler.unauthorize(res);
    }
    return jsonwebtoken.verify(token, process.env.TOKEN_SECRET);
  } catch {
    return false;
  }
};

const auth = async (req, res, next) => {
  const tokenUser = tokenDecode(req);
  if (!tokenUser) return responseHandler.unauthorize(res);
  const user = await userModel.findById(tokenUser.data);
  if (!user) responseHandler.unauthorize(res);

  req.user = user;
  next();
};

export default { auth, tokenDecode };
