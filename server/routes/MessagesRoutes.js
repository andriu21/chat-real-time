import { Router } from "express";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";
import { getMessages } from "../controllers/MessageController.js";

const messagesRoutes = Router();

messagesRoutes.post("/get-messages",verifyToken,getMessages);

export default messagesRoutes

