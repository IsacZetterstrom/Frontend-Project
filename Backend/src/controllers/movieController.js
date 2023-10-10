import movieModel from "../models/movieModel.js";


async function getScreenings(req, res) {
  try {
    const movieID = req.params.movie_id;

    const screenings = await movieModel.getScreenings(movieID);
    
    res.json(screenings[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export default { getScreenings };