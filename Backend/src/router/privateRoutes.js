import { Router } from "express";
import userController from "../controllers/userController.js";
const privateRoutes = Router();

privateRoutes.get("/user", userController.getProfile);
privateRoutes.patch("/user");
privateRoutes.get("/user/bookings");
privateRoutes.delete("/user/bookings/:booking_id");

export default privateRoutes;
