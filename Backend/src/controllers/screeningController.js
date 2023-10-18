import screeningModel from "../models/screeningModel.js";
import clientsHandler from "../services/clientsHandler.js";
/*
Description: Controllers for handling screening requests
*/

/*
Author: Oliver Andersson
Handle route /movies/:movie_id/screenings
Returns all screenings for one movie
*/
async function getScreenings(req, res) {
  try {
    const movieId = req.params.movieId;

    const screenings = await screeningModel.getScreenings(movieId);
    res.json(screenings);
  } catch (error) {
    res
      .status(500)
      .json({ error: "No screenings found for the specified movie" });
  }
}

/*
Author: Oliver Andersson
Handle route /movies/:movie_id/screenings/:ID
Returns a single screening and its seat information
 */
async function getScreening(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });

  try {
    const screeningId = req.params.screeningId;
    
    clientsHandler.addClient(res, screeningId);

    const screening = await screeningModel.getScreening(screeningId);
    res.write("data: " + JSON.stringify(screening[0]) + "\n\n");

  } catch (error) {
    res
      .status(500)
      .json({ error: "No screenings found by the specified screening_id" });
  }


  req.on('close', () => clientsHandler.closeConnection(res));
}

/**
* @Author: Louise Johansson
*@Description: Controller to handle return of getScreeningsByDate model
*/
async function getScreeningsByDate(req, res) {
  try {
    const movieId = req.params.movieId;
    const query = req.params.query;
    const screenings = await screeningModel.getScreeningsByDate(movieId, query);

    if (screenings.length === 0) {
      return res
        .status(404)
        .json({ error: "No screenings found for the specified date" });
    }

    res.json(screenings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export default { getScreenings, getScreeningsByDate, getScreening };
