import screeningModel from "../models/screeningModel.js";

async function getScreenings(req, res) {
  try {
    const movieID = req.params.movie_id;

    const screenings = await screeningModel.getScreenings(movieID);
    
    res.json(screenings[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

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

export default { getScreenings, getScreeningsByDate };