import aiModel from "../models/aiModel.js";
import aiConfig from "../config/aiConfig.js";
import tmdbModel from "../models/tmdbModel.js";
async function getRecommended(req, res) {
	const userId = 1;
	try{

	//Collect screeningsids based on user bookings(LIMIT 5)	
	const ScreeningIds = await aiModel.collectScreenings(userId)
	//Collect movie information about movies on screening
	const movieData = await aiModel.collectMovieInformation(ScreeningIds)
	//Configure the payload for AI based on actors,genre,directors
	const payload = await aiConfig.getPayload(movieData)
	//Call open AI to get 5 recommended movies.
	const recommendedData = await aiModel.getRecommended(payload);

	//Clean the text result from AI, seperate the titles and imdb links
	const titles = await aiConfig.resultClean(recommendedData.choices[0].text)
	//Get movie posters from api call (This api is very slow, might remove)
	const moviePoster = await tmdbModel.getMovieInfo(titles.titles)
	const data = {titles, moviePoster}
	const combinedArray = data.titles.titles.map((title, index) => ({
		title,
		imdbLink: data.titles.imdbLinks[index],
		posterURL: data.moviePoster.moviesArray[index]
	  }));
	  
	  console.log(combinedArray);
	res.status(200).json({combinedArray} );
	}catch(error){
		res.status(500).json({ error: "Problem with collecting the data" });
	}
	
}

export default {getRecommended}