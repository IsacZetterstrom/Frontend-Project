import aiModel from "../models/AiModel.js";
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
	console.log(titles)
	const moviePoster = await tmdbModel.getMovieInfo(titles.titles)
	console.log(moviePoster)
	res.status(200).json({ message: "Ok" } );
	}catch(error){
		res.status(500).json({ error: "Problem with collecting the data" });
	}
	
}

export default {getRecommended}