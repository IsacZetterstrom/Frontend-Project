import { Router } from "express";
import authController from "../controllers/authController.js";
const authRoutes = Router();

authRoutes.post("/login", authController.authUser);
authRoutes.post("/register");

export default authRoutes;
