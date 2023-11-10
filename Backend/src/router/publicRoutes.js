import { Router } from "express";
import screeningController from "../controllers/screeningController.js";
import movieController from "../controllers/movieController.js";
import bookingController from "../controllers/bookingController.js";
import aiController from "../controllers/aiController.js";
const publicRoutes = Router();



//MOVIE ROUTES
publicRoutes.get("/ai", aiController.getRecommended)

publicRoutes.get("/movies", movieController.getMovies);
publicRoutes.get("/movies/:movieId", movieController.getOneMovie);
publicRoutes.get("/filter", movieController.filterMovies);
//SCREENING ROUTES
publicRoutes.get(
  "/movies/:movieId/screenings",
  screeningController.getScreenings
);
publicRoutes.get(
  "/movies/:movieId/screenings/:query",
  screeningController.getScreeningsByDate
);
publicRoutes.get(
  "/movies/screenings/:screeningId",
  screeningController.getScreening
);

//BOOKING ROUTES
publicRoutes.post(
  "/movies/:movieId/screenings/:screeningId/booking",
  bookingController.createBooking
);

export default publicRoutes;
