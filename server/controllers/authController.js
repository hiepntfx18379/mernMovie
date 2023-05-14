import userModel from "../models/userMode.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";

export const register = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    const checkUser = await userModel.findOne({ username });

    if (checkUser)
      return responseHandler.badRequest(res, "Username has already existing");

    const user = new userModel();
    user.username = username;
    user.setPassword(password);
    user.displayName = displayName;

    await user.save();

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "12h",
      }
    );

    responseHandler.created(res, {
      token,
      ...user._doc,
      id: user.id,
    });
  } catch {
    responseHandler.error(res);
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await userModel
      .findOne({ username })
      .select("username password salt displayName id");
    if (!user) return responseHandler.badRequest(res, "User not found!!!");

    if (!user.validPassword(password))
      return responseHandler.badRequest(res, "Password was wrong!!!");

    const token = jsonwebtoken.sign(
      { data: user.id },
      process.env.TOKEN_SECRET,
      {
        expiresIn: "12h",
      }
    );

    user.password = undefined;
    user.salt = undefined;

    responseHandler.created(
      res.cookie("access_token", token, {
        httpOnly: true,
      }),
      {
        token,
        ...user._doc,
        id: user.id,
      }
    );
  } catch {
    responseHandler.error(res);
  }
};
