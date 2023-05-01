import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/userMode.js";

const tokenDecode = (req) => {
  try {
    const token = req.cookies.access_token;
    console.log(token);
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
  console.log(tokenUser);
  if (!tokenUser) return responseHandler.unauthorize(res);

  const user = await userModel.findById(tokenUser.data);
  console.log(user);
  if (!user) responseHandler.unauthorize(res);

  req.user = user;
  next();
};

export default { auth, tokenDecode };
