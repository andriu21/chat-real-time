import { Router } from "express";
import { signup } from "../controllers/AuthController.js";

const authRoutes = Router();

authRoutes.post('/singup',signup)


export default authRoutes