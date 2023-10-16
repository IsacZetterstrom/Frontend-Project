import { Router } from "express";
import screeningController from "../controllers/screeningController.js";
import movieController from "../controllers/movieController.js";

const publicRoutes = Router();

//MOVIE ROUTES
publicRoutes.get("/movies", movieController.getMovies);
publicRoutes.get("/movies/:movie_id", movieController.getOneMovie);


//SCREENING ROUTES
publicRoutes.get("/movies/:movie_id/screenings", screeningController.getScreenings);
publicRoutes.get("/movies/:movie_id/screenings/:query", screeningController.getScreeningsByDate);
publicRoutes.get("/movies/screenings/:screening_id", screeningController.getScreening);

//BOOKING ROUTES 
publicRoutes.post("/movies/:movie_id/screenings/:screening_id/booking");

export default publicRoutes;
