import { Router } from "express";
import { searchContacts } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";


const contactRoutes = Router();

contactRoutes.post('/search',verifyToken,searchContacts)

export default contactRoutes;