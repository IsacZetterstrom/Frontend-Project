import { Router } from "express";
import userController from "../controllers/userController.js";

import bookingController from "../controllers/bookingController.js";

const privateRoutes = Router();

privateRoutes.get("/user", userController.getProfile);
privateRoutes.patch("/user", userController.editUser);
privateRoutes.delete(
  "/user/bookings/:booking_id",
  bookingController.delBooking
);
privateRoutes.get("/user/bookings", userController.getUserBookings);

export default privateRoutes;
