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

export default { getMovieInformation }