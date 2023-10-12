import { Router } from "express";
import usercontroller from "../controllers/userController.js";

import bookingController from "../controllers/bookingController.js";

const privateRoutes = Router();

privateRoutes.get("/user", userController.getProfile);
privateRoutes.patch("/user", userController.editUser);
privateRoutes.delete("/user/bookings/:booking_id",bookingController.delBooking);
privateRoutes.get("/user/bookings", usercontroller.getUserBookings);

export default privateRoutes;
