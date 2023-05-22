import userModel from "../models/userMode.js";
import jsonwebtoken from "jsonwebtoken";
import responseHandler from "../handlers/response.handler.js";
import tmdbApi from "../tmdb/tmdb.api.js";

export const register = async (req, res) => {
  try {
    const { username, password, displayName } = req.body;
    const checkUser = await userModel.findOne({ username });

    if (checkUser)
      return res.status(400).json({message: "Username has already existing"})

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

res.status(200).json({
      token,
      ...user._doc,
      id: user.id,
    }) 
  } catch {
    res.status(500).json({ message: "Something wrong!!"})
  }
};

export const login = async (req, res) => {
    try{
      const { username, password } = req.body;

      const user = await userModel
        .findOne({ username })
        .select("username password salt displayName id");
      if (!user) return  res.status(400).json({message: "User not found!!!"})
  
      if (!user.validPassword(password))
        return res.status(400).json({message: "Password was wrong!!!"})
  
      const token = jsonwebtoken.sign(
        { data: user.id },
        process.env.TOKEN_SECRET,
        {
          expiresIn: "12h",
        }
      );
  
      user.password = undefined;
      user.salt = undefined;
      
      res.status(200).json( {
          token,
          ...user._doc,
          id: user.id,
        })
    }catch{
      res.status(500).json({ message: "Something wrong!!"})
    }

};

export const getLanguage = async (req, res) => {
  try{
    const response = await tmdbApi.language();
    responseHandler.ok(res, response)
  }catch{
    responseHandler.error(res)
  }
}
