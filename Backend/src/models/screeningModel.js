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

// Author: Oliver Andersson
// Fetch a single screening using screeningID
async function getScreening(screeningID) {
  try {
    
    const screeningInfo = await connection.promise().query(`
      SELECT Screening.Screening_id, Theater.Theater_id, Movie.Title, Theater.Theater_name,
      Screening.Screening_startime, Screening.Screening_date
      
      FROM Screening
      INNER JOIN Theater ON Theater.Theater_id = Screening.Theater_id
      INNER JOIN Movie ON Movie.Movie_id = Screening.Movie_id
      WHERE Screening.Screening_id=?
    `, [screeningID]);

    // If screening is found, fetch seats
    if(screeningInfo[0][0]) {
     
      const bookedSeats = await connection.promise().query(`
        SELECT Seat.Number_row, Seat.Number_seat
        FROM Screening
        INNER JOIN Ticket ON Ticket.Screening_id = Screening.Screening_id
        INNER JOIN Seat ON Seat.Seat_id = Ticket.Seat_id
        AND Seat.Theater_id = Screening.Theater_id
        WHERE Screening.Screening_id=?
      `, [screeningID]);

      const freeSeats = await connection.promise().query(`
        SELECT Seat.Number_row, Seat.Number_seat
        FROM Seat
        INNER JOIN Screening ON Seat.Theater_id = Screening.Theater_id
        LEFT JOIN Ticket ON Ticket.Seat_id = Seat.Seat_id AND Ticket.Screening_id = Screening.Screening_id
        WHERE Screening.Screening_id=? AND Ticket.Seat_id IS NULL;
      `, [screeningID]);

      screeningInfo[0][0].bookedSeats = bookedSeats[0]
      screeningInfo[0][0].freeSeats = freeSeats[0]
    }

    return screeningInfo;

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

export default { getScreenings, getScreening, getScreeningsByDate };