import aiModel from "../models/aiModel.js";
import aiConfig from "../config/aiConfig.js";
import tmdbModel from "../models/tmdbModel.js";

/**
* @author Oskar Dahlberg
* @Description Gets movieinformation based on user bookings then calls AI to give movie suggestions.
  Uses Movie API and datacleaning to struct a dataset with poster pic and title.
*/
async function getRecommended(req, res) {
	const userId = req.decoded.id;
	try {
		//Collect screeningsids based on user bookings(LIMIT 5)	
		const ScreeningIds = await aiModel.collectScreenings(userId)
		if (ScreeningIds && ScreeningIds.length > 0) {
			//Collect movie information about movies on screening
			const movieData = await aiModel.collectMovieInformation(ScreeningIds)
			//Configure the payload for AI based on actors,genre,directors
			const payload = await aiConfig.getPayload(movieData)
			//Call open AI to get 5 recommended movies.
			const recommendedData = await aiModel.getRecommended(payload);
			//Clean the text result from AI, seperate the titles and imdb links
			const titles = aiConfig.resultClean(recommendedData.choices[0].text)
			//Get movie posters from api call (API Slows down the querytime abit)
			const moviePoster = await tmdbModel.getMovieInfo(titles.titles)
			const data = { titles, moviePoster }
			const result = data.titles.titles.map((title, index) => ({
				title,
				imdbLink: data.titles.imdbLinks[index],
				posterURL: data.moviePoster.moviesArray[index]
			}));
			res.status(200).json({ result });

		} else {
			res.status(500).json({ error: "No screenings found" });

		}
	} catch (error) {
		res.status(500).json({ error: "Problem with collecting the data" });
	}

}

export default { getRecommended }