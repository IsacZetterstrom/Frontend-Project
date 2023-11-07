import aiModel from "../models/AiModel.js";
import aiConfig from "../config/aiConfig.js";

async function getRecommended(req, res) {
	const userId = 1;
	try{

	//Collect screeningsids based on user bookings(LIMIT 5)	
	const ScreeningIds = await aiModel.collectScreenings(userId)
	//Collect movie information about movies on screening
	const movieData = await aiModel.collectMovieInformation(ScreeningIds)
	const payload = await aiConfig.getPayload(movieData)
	//const recommendedData = await aiModel.getRecommended(payload);
	const responseText = `
1. Edge of Tomorrow (2014) - https://www.imdb.com/title/tt1631867/
2. The Bourne Ultimatum (2007) - https://www.imdb.com/title/tt0440963/
3. Star Wars: Episode II - Attack of the Clones (2002) - https://www.imdb.com/title/tt0121765/
4. Star Wars: Episode III - Revenge of the Sith (2005) - https://www.imdb.com/title/tt0121766/
5. Mission: Impossible - Ghost Protocol (2011) - https://www.imdb.com/title/tt1229238/
`;

	const titles = await aiConfig.resultClean(responseText)
    console.log(titles)
	res.status(200).json({ message: "Ok" } );
	}catch(error){
		res.status(500).json({ error: "Problem with collecting the data" });
	}
	
}

export default {getRecommended}