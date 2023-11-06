import aiModel from "../models/AiModel.js";


async function getRecommended(req, res) {
	let cinemaType = 'Movie';
	let selectedCategories = ["Action", "Comedy"];
	let specificDescriptors = 'Tom cruise, Sylvester Stallone, directed by Quentin Tarantino';
	let fullSearchCriteria = `Give me a list of 5 ${cinemaType} recommendations ${
		selectedCategories ? `that fit all of the following categories: ${selectedCategories}` : ''
	}. ${
		specificDescriptors
			? `Make sure it fits the following actors and directors: ${specificDescriptors}.`
			: ''
	} ${
		selectedCategories || specificDescriptors
			? `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${cinemaType}'s that I might like.`
			: ''
	} Please return this response as a numbered list with the ${cinemaType}'s title, followed by the imdb link to the {cinemaType} `;
	
	const payload = {
		model: 'text-davinci-003',
		prompt: fullSearchCriteria,
		temperature: 0.7,
		max_tokens: 500,
		top_p: 1.0,
		frequency_penalty: 0.0,
		stream: false,
		presence_penalty: 0.0,
		n: 1
	};
	try {
    const recommendedData = await aiModel.getRecommended(payload);
    console.log(recommendedData)
    res.status(200).send({ message: "data found" });
  } 
  catch (error) {
    res.status(500).json({ error: "A problem with the ai" });
  }
}

export default {getRecommended}