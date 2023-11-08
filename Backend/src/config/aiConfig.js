/**
* @author Oskar Dahlberg
* @Description Cleans the AI text output into movie title and a imdb link.
*/
function resultClean(result) {

    const titles = [];
    const imdbLinks = [];
    const titleRegex = /\d+\.\s(.*?)\s\(\d+\)/g;   
     const linkRegex = /https:\/\/www\.imdb\.com\/title\/(tt\d+)\//g;
    console.log(result)
    const titleMatches = result.match(titleRegex);
    const imdbLinkMatches = result.match(linkRegex);
    
    if (titleMatches) {
      titles.push(...titleMatches.map(match => match.trim()));
    }
    
    if (imdbLinkMatches) {
      imdbLinks.push(...imdbLinkMatches);
    }
    console.log(titles, imdbLinks)
    return { titles, imdbLinks };
}
/**
* @author Oskar Dahlberg
* @Description Struct the movie dataset based on the user watched movies. 
*/
function dataClean(movieDataArray) {
    const actorsTable = new Set();
    const directorsTable = new Set();
    const genresTable = new Set();
    //Clean the data and takes no duplicates
    for (const movieData of movieDataArray) {
        for (const movie of movieData) {
            const actors = movie.Actors.split(',');
            for (const actor of actors) {
                actorsTable.add(actor);
            }
            directorsTable.add(movie.Director);
            genresTable.add(movie.Genre);
        }
    }
    const actorsArray = Array.from(actorsTable);
    const directorsArray = Array.from(directorsTable);
    const genresArray = Array.from(genresTable);
    return { actorsArray, directorsArray, genresArray }
}

/**
* @author Oskar Dahlberg
* @Description Sets the payload for the AI. 
    This can be heavely modified to get tv shows or suggest other stuff to the user based on data.
    Current model  text-davinci-003 but can be changed to get other results.
*/

async function getPayload(movieData) {
    const data = dataClean(movieData);
    //can switch to tv-shows exc if wanted
    let cinemaType = 'Movie';
    let selectedCategories = data.genresArray;
    let specificActors = data.actorsArray
    let specificDirectors = data.directorsArray;
    let fullSearchCriteria = `Give me a list of 5 ${cinemaType} recommendations ${selectedCategories ? `that fit all of the following categories: ${selectedCategories}` : ''
        }. ${specificActors
            ? `Make sure it fits the following actors: ${specificActors} or directors: ${specificDirectors}.`
            : ''
        } ${selectedCategories || specificActors
            ? `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${cinemaType}'s that I might like.`
            : ''
        } Please return this response as a numbered list with the ${cinemaType}'s title, followed by the imdb link to the ${cinemaType}.`;

    //Config to select what AI model and what to send
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
    return payload
}

export default { getPayload, resultClean }