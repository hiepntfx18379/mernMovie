import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/userMode.js";

const auth = async (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (bearerHeader) {
      const token = bearerHeader.split(" ")[1];
      if (!token) return responseHandler.unauthorize(res);

      // xac thuc token from client
      const decoded = jsonwebtoken.verify(
        token,
        process.env.TOKEN_SECRET,
        (err, data) => {
          console.log("data: ", data);
        }
      );

      if (!decoded) return responseHandler.unauthorize(res);

      const user = await userModel.findById(decoded.data);
      console.log("ok2", user);
      if (!user) responseHandler.unauthorize(res);
      req.user = user;
      next();
    }

    return false;
  } catch {
    return false;
  }
};

export default { auth };
