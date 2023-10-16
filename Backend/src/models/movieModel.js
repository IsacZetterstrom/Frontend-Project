import connection from "../config/database.js";

/*
Author: Louise Johansson
Description: Model to get information about a specific movie
*/
async function getMovieInformation(movie_id) {

  
  try {
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
      `,[movie_id]);
    return rows;
  } catch (error) {
    throw error;
  }
};

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
);`

const [movies] = await connection.execute(query)

return movies
}

/**
 * @Author Niklas Nguyen, isac Zetterström
 * @Description Model to get filtered movies from each screening.
 * @returns an array with filterd movies data that has a screening
 */

async function filterAllMovies(filter, sort, search) {

 if(sort === 'dateHigh'){
  sort = {
    name: 'Screening.Screening_date',
    by: 'DESC'
  }
 }else if (sort === 'dateLow'){
  sort = {
    name: 'Screening.Screening_date',
    by: 'ASC'
  }
 }else if (sort === 'ratingHigh'){
  sort = {
    name: 'Movie.Rating',
    by: 'DESC'
  }
 }else if (sort === 'ratingLow'){
  sort = {
    name: 'Movie.Rating',
    by: 'ASC'
  }
 }


  const query = `SELECT DISTINCT Movie.Movie_id,
  MAX(Screening.Screening_date) AS Screening_date,
  Movie.Title,
  Movie.Genre,
  Movie.Rating,
  Movie.Adult
  FROM Screening
  JOIN Movie ON Screening.Movie_id = Movie.Movie_id
  WHERE Movie.Title LIKE '${search}%'
  GROUP BY Movie.Movie_id,
  Movie.Title,
  Movie.Genre,
  Movie.Rating,
  Movie.Adult
  ${sort === '' ? '' : "ORDER BY " + 'MAX('+ sort.name + ") " + sort.by}`;

  const [movies] = await connection.execute(query)

  return movies
}

export default { getMovieInformation, currentMovies, filterAllMovies }