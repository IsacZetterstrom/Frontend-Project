import { Router } from "express";
import userController from "../controllers/userController.js";
import aiController from "../controllers/aiController.js";
import bookingController from "../controllers/bookingController.js";
import { rateLimit } from 'express-rate-limit'
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 10, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
})

const privateRoutes = Router();
privateRoutes.get("/moviedata", aiController.getMovieInfo)

privateRoutes.post("/recommended",limiter, aiController.getRecommended)
privateRoutes.get("/user", userController.getProfile);
privateRoutes.patch("/user", userController.editUser);
privateRoutes.delete("/user/bookings/:bookingId", bookingController.delBooking);
privateRoutes.get("/user/bookings", userController.getUserBookings);

export default privateRoutes;
