import connection from "../config/database.js";

/*
Description:
Models for fetching screening data from database
*/

// Author: Oliver Andersson
// Fetch all screenings for a specific movie using movieID
async function getScreenings(movieID) {
  try {
    
    const result = await connection.promise().query(`
      SELECT Screening.Screening_id, Movie.Title, Theater.Theater_name,
      Screening.Screening_startime, Screening.Screening_date
      
      FROM Screening
      INNER JOIN Theater ON Theater.Theater_id = Screening.Theater_id
      INNER JOIN Movie ON Movie.Movie_id = Screening.Movie_id
      WHERE Screening.movie_id=?
    `, [movieID]);

    return result;
  } catch (error) {
    console.error('Error in getScreenings model', error);
    throw error;
  }
};

/*
Author: Louise Johansson
Description: Model to get specific screening based on date
*/
async function getScreeningsByDate(movieID, date) {
  try {
    const result = await connection.promise().query(`
    SELECT 
      Screening.Screening_id, 
      Movie.Title, 
      Theater.Theater_name,
      Screening.Screening_startime, 
      Screening.Screening_date
    FROM Screening
    INNER JOIN 
      Theater ON Theater.Theater_id = Screening.Theater_id
    INNER JOIN 
      Movie ON Movie.Movie_id = Screening.Movie_id
    WHERE 
      Screening.movie_id=? 
    AND 
      Screening.Screening_date=?
    `, [movieID, date]);

    return result[0];
  } catch (error) {
    throw error;
  }
}

export default { getScreenings, getScreeningsByDate };