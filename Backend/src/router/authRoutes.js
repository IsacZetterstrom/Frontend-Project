import { Router } from "express";
import authController from "../controllers/authController.js";

const authRoutes = Router();

authRoutes.post("/login", authController.login);
authRoutes.post("/register", authController.registerUser);

export default authRoutes;
