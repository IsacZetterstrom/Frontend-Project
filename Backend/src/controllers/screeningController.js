import screeningModel from "../models/screeningModel.js";

/*
Description:
Controllers for handling screening requests
*/

/*
Author: Oliver Andersson
Handle route /movies/:movie_id/screenings
Returns all screenings for one movie
*/
async function getScreenings(req, res) {
  try {
    const movieID = req.params.movie_id;

    const screenings = await screeningModel.getScreenings(movieID);
    res.json(screenings);
  } catch (error) {
    res.status(500).json({ error: "No screenings found for the specified movie" });
  }
};

/*
Author: Oliver Andersson
Handle route /movies/:movie_id/screenings/:ID
Returns a single screening and its seat information
 */
async function getScreening(req, res) {
  try {
    const screeningID = req.params.screening_id;

    const screening = await screeningModel.getScreening(screeningID);
    
    res.json(screening[0]);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "No screenings found by the specified screening_id" });
  }
};

/*
Author: Louise Johansson
Description: Controller to handle return of getScreeningsByDate model
*/
async function getScreeningsByDate(req, res) {
  try {
    const movieID = req.params.movie_id;
    const query = req.params.query;
    const screenings = await screeningModel.getScreeningsByDate(movieID, query);

    if (screenings.length === 0) {
      return res.status(404).json({ error: "No screenings found for the specified date" });
    }

    res.json(screenings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
}



export default { getScreenings, getScreeningsByDate, getScreening };