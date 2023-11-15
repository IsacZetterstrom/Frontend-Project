import connection from "../config/database.js";

/*
Author: Louise Johansson
Description: Model to get information about a specific movie
*/
async function getMovieInformation(movieId) {
  const [rows] = await connection.execute(
    `
      SELECT 
          M.Movie_id,
          M.Title,
          M.Release_date,
          M.Genre,
          M.Rating,
          CONCAT(D.Firstname, ' ', D.Lastname) AS Director_name,
          MI.About,
          MI.Runtime,
          MI.Poster,
          MI.Image,
          MI.Lang,
          MI.Trailer,
          GROUP_CONCAT(CONCAT(A.Firstname, ' ', A.Lastname) SEPARATOR ', ') AS Actor_names
      FROM 
          Movie M
      JOIN 
          Director D ON M.Director_id = D.Director_id
      JOIN 
          Movie_Information MI ON M.Movie_id = MI.Movie_id
      LEFT JOIN Movie_Actor MA ON M.Movie_id = MA.Movie_id
      LEFT JOIN Actor A ON MA.Actor_id = A.Actor_id
      WHERE 
          M.Movie_id = ?
      GROUP BY M.Movie_id, M.Title, M.Release_date, M.Genre, M.Rating, Director_name, MI.About, MI.Runtime, MI.Poster, MI.Image, MI.Lang, MI.Trailer;
      `,
    [movieId]
  );
  return rows;
}

/**
 * @Author Niklas Nguyen
 * @Description Model to get the movie from each screening
 * @returns an array with movies data that has a screening
 */

async function currentMovies() {
  const query = `SELECT Movie.Movie_id,
Movie.*
FROM Movie 
WHERE Movie.Movie_id IN (
    SELECT DISTINCT Screening.Movie_id
    FROM Screening
);`;

  const [movies] = await connection.execute(query);

  return movies;
}

/**
 * @Author Niklas Nguyen, isac Zetterström
 * @Description Model to get filtered movies from each screening.
 * @returns an array with filterd movies data that has a screening
 */

async function filterAllMovies(filter, sort, search) {
  if (sort === "dateHigh") {
    sort = {
      name: "Movie.Release_date",
      by: "DESC",
      order: "MAX",
    };
  } else if (sort === "dateLow") {
    sort = {
      name: "Movie.Release_date",
      by: "ASC",
      order: "MIN",
    };
  } else if (sort === "ratingHigh") {
    sort = {
      name: "Movie.Rating",
      by: "DESC",
      order: "MAX",
    };
  } else if (sort === "ratingLow") {
    sort = {
      name: "Movie.Rating",
      by: "ASC",
      order: "MIN",
    };
  }

  const query = `SELECT DISTINCT Movie.Movie_id,
  ${sort === "" ? "MAX" : sort.order}(Screening.Screening_date) AS Screening_date,
  Movie.Title,
  Movie.Genre,
  Movie.Rating,
  Movie.Age,
  Movie_Information.Poster
  FROM Screening
  JOIN Movie ON Screening.Movie_id = Movie.Movie_id
  JOIN Movie_Information ON Screening.Movie_id = Movie_Information.Movie_id
  WHERE Movie.Title LIKE ?
  ${filter === "" ? "" : `AND Movie.Age = ${filter}`}
  GROUP BY Movie.Movie_id,
  Movie.Title,
  Movie.Genre,
  Movie.Rating,
  Movie.Age,
  Movie_Information.Poster
  ${sort === "" ? "" : `ORDER BY ${sort.order} (${sort.name}) ${sort.by} `}`;
  const [movies] = await connection.execute(query, [`${search}%`]);

  return movies;
}

/**
 * @author Niklas Nguyen, Isac zetterström
 * @description this sorts the top 5 newest movies by relasedate
 */

async function getNewestMovie() {
  const [popMovies] = await connection.execute(
    `SELECT
      Movie.Movie_id,
      Movie.Title,
      Movie.Release_date,
      Movie_Information.Poster,
      Movie_Information.Image
    FROM Movie
    JOIN Movie_Information ON Movie.Movie_id = Movie_Information.Movie_id
    WHERE Movie.Release_date < current_date()
    ORDER BY Movie.Release_date DESC
    LIMIT 5;`
  );
  return popMovies;
}

async function getPopular(query) {
  const [popMovies] = await connection.execute(
    `Movie.Movie_id,
    Movie.Title,
    Movie_Information.Poster,
    Movie_Information.Image,
    COUNT(Ticket.Ticket_id) AS TicketCount
    FROM 
    Movie
    JOIN Screening ON Movie.Movie_id = Screening.Movie_id
    JOIN Movie_Information ON Movie.Movie_id = Movie_Information.Movie_id
    JOIN Ticket on Screening.Screening_id = Ticket.Screening_id
    GROUP BY 
    Movie.Movie_id, Movie.title, Movie_Information.Poster,Movie_Information.Image
    ORDER BY 
    TicketCount DESC
LIMIT 5;`
  );
  return popMovies;
}
/**
* @author Oskar Dahlberg
* @Description Returns unreleased movies
*/
async function getUpcoming(query) {
  const [upcomingMovies] = await connection.execute(
    `  SELECT 
    Movie.Movie_id,
    Movie.Title,
    Movie.Release_date,
    Movie_Information.Poster,
    Movie_Information.Image
    FROM 
    Movie
  JOIN Movie_Information ON Movie.Movie_id = Movie_Information.Movie_id
    WHERE Movie.Release_date > current_date();
  `,
    []
  );
  return upcomingMovies;
}
/**
* @author Oskar Dahlberg
* @Description Gets movies based on genre by query
*/
async function getGenre(query) {
  const [byGenre] = await connection.execute(
    `SELECT 
    Movie.Movie_id,
    Movie.Title,
    Movie.Release_date,
    Movie.Genre,
  Movie_Information.Poster
    FROM 
    Movie
  JOIN Movie_Information ON Movie.Movie_id = Movie_Information.Movie_id
  WHERE Movie.Genre LIKE ?`,
    [`%${query}%`]
  );
  return byGenre;
}

export default {
  getMovieInformation,
  currentMovies,
  filterAllMovies,
  getPopular,
  getUpcoming,
  getGenre,
  getNewestMovie,
};
