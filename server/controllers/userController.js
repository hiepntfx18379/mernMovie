import responseHandler from "../handlers/response.handler.js";
import userModel from "../models/userMode.js";

export const prevent = async (res, req) => {};

export const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req.body;

    const user = await userModel
      .findById(req.user.id)
      .select("salt password id");

    if (!user) return responseHandler.notFound(res);
    if (!user.validPassword(password))
      return responseHandler.badRequest(res, "Password was wrong");

    user.setPassword(newPassword);
    await user.save();

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};

export const getInfo = async (req, res) => {
  try {
    console.log(req.user);
    const user = await userModel.findById(req.user.id);
    if (!user) return responseHandler.notFound(res);

    responseHandler.ok(res, user);
  } catch {
    responseHandler.error(res);
  }
};
