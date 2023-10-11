import { Router } from "express";
import usercontroller from "../controllers/userController.js";

const privateRoutes = Router();

privateRoutes.get("/user");
privateRoutes.patch("/user");
privateRoutes.get("/user/bookings", usercontroller.getUserBookings);
privateRoutes.delete("/user/bookings/:booking_id");


export default privateRoutes;
