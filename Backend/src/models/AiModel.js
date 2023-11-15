import connection from "../config/database.js";
import "dotenv/config";
import OpenAI from 'openai';
/**
* @author Oskar Dahlberg
* @Description Collects all movie information about screenings the user has been watching. 
*/
async function collectMovieInformation(ids) {
  const movieData = [];
  for (const item of ids) {
    const [rows] = await connection.execute('CALL collectMovie(?)', [item.Movie_id]);
    movieData.push(rows[0])
  }
  return movieData;
}

/**
* @author Oskar Dahlberg
* @Description Collects movie ids from movies that user watched.
*/
async function collectMovieIds(userId) {
  const [rows] = await connection.execute(
    `
    SELECT DISTINCT Movie.Movie_id
    FROM User
    JOIN Booking ON User.User_id = Booking.User_id
    JOIN Ticket ON Booking.Booking_id = Ticket.Booking_id
    JOIN Screening ON Ticket.Screening_id = Screening.Screening_id
    JOIN Movie ON Screening.Movie_id = Movie.Movie_id
    WHERE User.User_id = ?;
  `,
    [userId]
  );
  return rows;
}

/**
* @author Oskar Dahlberg
* @Description Calls the AI and gets recommended movies based on input.
*/


async function getRecommended(payload) {
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create(payload)
const functionCall = response.choices[0].message.function_call;
const json = JSON.parse(functionCall.arguments);
return json
}

export default { getRecommended, collectMovieIds, collectMovieInformation };
