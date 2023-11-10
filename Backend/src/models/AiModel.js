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


async function getRecommended(input) {

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const response = await openai.chat.completions.create(
    {
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "user",
          content: input,
        },
      ],
      functions: [
        {
          name: "get_movielist",
          description: "Get a list of movies from query.",
          parameters: {
            type: "object",
            properties: {
              movielist: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    imdb: {
                      type: "string",
                      description: "The imdb link to the movie.",
                    },
                    title: {
                      type: "string",
                      description: "The title of the movie.",
                    },
                  },
                },
              },
            },
            required: ["movielist"],
          },
        },
      ],
      function_call: "auto",
    }

  )
const functionCall = response.choices[0].message.function_call;
const json = JSON.parse(functionCall.arguments);
return json
}

export default { getRecommended, collectScreenings, collectMovieInformation };
