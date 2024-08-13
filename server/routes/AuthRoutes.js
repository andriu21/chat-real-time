import { Router } from "express";
import { login, signup ,getUserInfo, updateProfile} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";

const authRoutes = Router();

authRoutes.post('/signup',signup)
authRoutes.post('/login',login)
authRoutes.get('/user-info',verifyToken,getUserInfo)
authRoutes.post('/update-profile',verifyToken,updateProfile)

export default authRoutes