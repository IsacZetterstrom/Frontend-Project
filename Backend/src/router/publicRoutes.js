import { Router } from "express";
import screeningController from "../controllers/screeningController.js";
import movieController from "../controllers/movieController.js";

const publicRoutes = Router();

//MOVIE ROUTES
publicRoutes.get("/movies");
publicRoutes.get("/movies/:movie_id", movieController.getOneMovie);
publicRoutes.get("/movies/:query");

//SCREENING ROUTES
publicRoutes.get("/movies/:movie_id/screenings", screeningController.getScreenings);
publicRoutes.get("/movies/:movie_id/screenings/:query", screeningController.getScreeningsByDate);
publicRoutes.get("/movies/:movie_id/screenings/:screening_id");

//BOOKING ROUTES 
publicRoutes.post("/movies/:movie_id/screenings/:screening_id/booking");

export default publicRoutes;
