import { Router } from "express";
import {
  login,
  signup,
  getUserInfo,
  updateProfile,
  addProfileImage,
  removeProfileImage,
  logoutProfile,
} from "../controllers/AuthController.js";
import { verifyToken } from "../middlewares/AuthMiddlewares.js";
import multer from "multer"; // esto se usa para poder subir archivos al servidor

const authRoutes = Router();
const upload = multer({ dest: "uploads/profiles/" }); // aqui configuramos la direccion donde queremos guardar la imagenes

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.get("/user-info", verifyToken, getUserInfo);
authRoutes.post("/update-profile", verifyToken, updateProfile);
authRoutes.post(
  "/add-profile-image",
  verifyToken,
  upload.single("profile-image"),
  addProfileImage
); // aqui le decimos el archivo a salvar
authRoutes.delete("/remove-profile-image", verifyToken, removeProfileImage);
authRoutes.post("/logout", logoutProfile);

export default authRoutes;
