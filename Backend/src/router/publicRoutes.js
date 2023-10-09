import { Router } from "express";

const publicRoutes = Router();

publicRoutes.get("/movies");
publicRoutes.get("/movies/:movie_id");
publicRoutes.get("/movies/:movie_id/screenings");
publicRoutes.get("/movies/:movie_id/screenings/:query");
publicRoutes.get("/movies/:movie_id/screenings/:screening_id");
publicRoutes.get("/movies/:query");

export default publicRoutes;
