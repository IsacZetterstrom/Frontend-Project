import screeningModel from "../models/screeningModel.js";

/*
Author: Oliver Andersson
Description:
Controllers for handling screening requests
*/

// Handle route /movies/:movie_id/screenings
async function getScreenings(req, res) {
  try {
    const movieID = req.params.movie_id;

    const screenings = await screeningModel.getScreenings(movieID);
    
    res.json(screenings[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export default { getScreenings };