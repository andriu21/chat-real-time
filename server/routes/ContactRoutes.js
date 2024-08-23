import { Router } from "express";
import { getContactsForDMList, searchContacts } from "../controllers/ContactController.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";


const contactRoutes = Router();

contactRoutes.post('/search',verifyToken,searchContacts)
contactRoutes.get('/get-contacts-for-dm',verifyToken,getContactsForDMList)

export default contactRoutes;