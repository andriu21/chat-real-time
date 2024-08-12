import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";

const maxAge = 3 * 24 * 60 * 60 * 1000;

const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};

export const signup = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send("Email and Password is required");
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).send("Email already exists");
    const user = new User({ email, password });
    res.cookie('jwt',createToken(email,userId),{
        maxAge,
        secure:true,
        sameSite : 'None'
    });
    return res.status(201).json({user:{
        id : user._id,
        email : user.email,
        profileSetup : user.profileSetup
    }})
    
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Internal server error");
  }
};
