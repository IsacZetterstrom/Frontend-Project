import movieModel from "../models/movieModel.js";

/**
 * @author Louise Johansson
 * @Description Controller to handle return of getMovieInformation model
 */
async function getOneMovie(req, res) {
  try {
    const { movieId } = req.params;
    const movieData = await movieModel.getMovieInformation(movieId);
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

/**
 * @author Niklas Nguyen, Isac Zetterström
 * @Description Controller to handle return of currentMovies model
 */

async function getMovies(req, res) {
  try {
    const { filter, sort, search } = req.query;

    const movies = await movieModel.filterAllMovies(filter, sort, search);
    if (movies.length > 0) {
      res.send(movies).status(200);
    } else {
      res.status(404).json({ error: "No movies matches the filters" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

/**
 * @author Oskar dahlberg
 * @Description Filter on toplist, unreleased and search for genre
 */
async function filterMovies(req, res) {
  try {
    const { query } = req.query;
    if (query === "toplist") {
      const toplist = await movieModel.getPopular(query);
      res.send(toplist).status(200);
    } else if (query == "upcoming") {
      const upcoming = await movieModel.getUpcoming(query);
      res.send(upcoming).status(200);
    } else {
      const byGenre = await movieModel.getGenre(query);
      res.send(byGenre).status(200);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default { getOneMovie, getMovies, filterMovies };
