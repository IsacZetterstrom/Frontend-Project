import { Router } from "express";

const privateRoutes = Router();

privateRoutes.get("/user");
privateRoutes.patch("/user");
privateRoutes.get("/user/bookings");
privateRoutes.delete("/user/bookings/:booking_id");

export default privateRoutes;
