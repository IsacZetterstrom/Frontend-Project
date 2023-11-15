import aiModel from "../models/aiModel.js";
import aiConfig from "../config/aiConfig.js";
import tmdbModel from "../models/tmdbModel.js";

/**
* @author Oskar Dahlberg
* @Description Gets movie information based on user bookings then calls AI to give movie suggestions.
  Uses Movie API and datacleaning to struct a dataset with poster pic and title.
*/
async function getMovieInfo(req,res){
	const userId = req.decoded.id;
	try{
		const movieIds = await aiModel.collectMovieIds(userId)
		const movieData = await aiModel.collectMovieInformation(movieIds)
		res.status(200).json(movieData);


	}
	catch (error) {
		res.status(500).json({ error: "Problem with collecting the data" });
	}


}
async function getRecommended(req, res) {
	const userId = req.decoded.id;
	const movieData = {
		"movieIds": req.body.Movie_id,
		"Temp": req.body.Temp,
		"isSwedish": req.body.isSwedish
	}
	try {
		
		//Collect movie ids based on user bookings.
		const movieIds = await aiModel.collectMovieIds(userId)
		if (movieIds && movieIds.length > 0 && movieData.movieIds.length > 0) {
			console.log("running...")
			console.log(movieData)
			//Collect movie information about movies on screening
			 movieData.movieInformation = await aiModel.collectMovieInformation(movieData.movieIds)
			//Configure the payload for AI based on actors,genre,directors
			const payload = await aiConfig.getPayload(movieData)
			//Call open AI to get 5 recommended movies, now returns a json file.
			const recommendedData = await aiModel.getRecommended(payload);
			//Get all details about the movie.
			const movieDetails = await tmdbModel.getMovieInfo(recommendedData)
			console.log("finished")
			res.status(200).json(movieDetails);

		} else {
			res.status(500).json({ error: "No screenings found" });

		}
	} catch (error) {
		res.status(500).json({ error: "Problem with collecting the data" });
	}

}

export default { getRecommended,getMovieInfo }