import { Router } from "express";
import userController from "../controllers/userController.js";
import aiController from "../controllers/aiController.js";
import bookingController from "../controllers/bookingController.js";

const privateRoutes = Router();
privateRoutes.get("/moviedata", aiController.getMovieInfo)

privateRoutes.post("/recommended", aiController.getRecommended)
privateRoutes.get("/user", userController.getProfile);
privateRoutes.patch("/user", userController.editUser);
privateRoutes.delete(
  "/user/bookings/:bookingId",
  bookingController.delBooking
);
privateRoutes.get("/user/bookings", userController.getUserBookings);

export default privateRoutes;
