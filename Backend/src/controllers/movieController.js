import Movie from "../models/movieModel.js";

async function getScreenings(req, res) {
  try {
    const movieID = req.params.movie_id;

    const screenings = await Movie.getScreenings(movieID);
    
    console.log(screenings[0])
    res.json(screenings[0]);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


export default { getScreenings };