import movieModel from "../models/movieModel.js";

/*
Author: Louise Johansson
Description: Controller to handle return of getMovieInformation model
*/
async function getOneMovie(req, res) {
  try {
      const { movie_id } = req.params;
      const movieData = await movieModel.getMovieInformation(movie_id);
      const movie = movieData[0];
      if (movie) {
        res.json({ status: 200, message: "Movie found", movie });
      } else {
        res.status(404).json({ error: "Movie not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

export default { getOneMovie };