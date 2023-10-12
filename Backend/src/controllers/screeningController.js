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


export default { getScreenings };