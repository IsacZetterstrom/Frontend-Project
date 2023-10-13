import screeningModel from "../models/screeningModel.js";

/*
Description:
Controllers for handling screening requests
*/

// Author: Oliver Andersson
// Handle route /movies/:movie_id/screenings
async function getScreenings(req, res) {
  try {
    const movieID = req.params.movie_id;

    const screenings = await screeningModel.getScreenings(movieID);
    res.json(screenings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export default { getScreenings };