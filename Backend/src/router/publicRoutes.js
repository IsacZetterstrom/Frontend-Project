import { Router } from "express";
import screeningController from "../controllers/screeningController.js";
import movieController from "../controllers/movieController.js";

const publicRoutes = Router();

//MOVIE ROUTES
publicRoutes.get("/movies", movieController.getMovies);
publicRoutes.get("/movies/:movieId", movieController.getOneMovie);

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
publicRoutes.post("/movies/:movieId/screenings/:screening_id/booking");

export default publicRoutes;
