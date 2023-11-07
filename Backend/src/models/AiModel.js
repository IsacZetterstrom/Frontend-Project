import connection from "../config/database.js";

import "dotenv/config";

/**
* @author Oskar Dahlberg
* @Description Collects all movie information about screenings the user has been watching. 
*/
async function collectMovieInformation(ids) {
  const movieData = [];
  for (const item of ids) {
    const [rows] = await connection.execute('CALL collectMovie(?)', [item.Screening_id]);
    movieData.push(rows[0])
  }
  return movieData;
}

/**
* @author Oskar Dahlberg
* @Description Collects 5 latest screenings from a user.
*/
async function collectScreenings(userId) {
  const [rows] = await connection.execute(
    `
    SELECT DISTINCT Screening_id
    FROM User
    JOIN Booking ON User.User_id = Booking.User_id
    JOIN Ticket ON Booking.Booking_id = Ticket.Booking_id
    WHERE User.User_id = ? 
    LIMIT 5;
  `,
    [userId]
  );
  return rows;
}

/**
* @author Oskar Dahlberg
* @Description Calls the AI and gets recommended movies based on payload.
*/
async function getRecommended(payload) {
  const res = await fetch('https://api.openai.com/v1/completions', {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    method: 'POST',
    body: JSON.stringify(payload)
  });
  if (res.ok) {
    const data = await res.json();
    return data;
  } else {
    console.error('API request failed:', res.statusText);
    return null;
  }
}

export default { getRecommended, collectScreenings, collectMovieInformation };
