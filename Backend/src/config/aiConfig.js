async function resultClean(result){
    const titles = [];
    const imdbLinks = []; 
    const titleRegex = /\d+\.\s(.*?)\s\(\d+\)/g;
    const linkRegex = /https:\/\/www\.imdb\.com\/title\/(tt\d+)\//g;

    let titleMatch;
    while ((titleMatch = titleRegex.exec(result)) !== null) {
        titles.push(titleMatch[1].trim());
    }
    let linkMatch;
    while ((linkMatch = linkRegex.exec(result)) !== null) {
        imdbLinks.push(`https://www.imdb.com/title/${linkMatch[1]}/`);
    }
  
    return {titles, imdbLinks}; 
}

async function dataClean(movieDataArray) {
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



async function getPayload(movieData) {
    const data = await dataClean(movieData);
    //can switch to tv-shows exc if wanted
    let cinemaType = 'Movie';
    let selectedCategories = data.genresArray;
    let specificDescriptors = data.actorsArray;
    let fullSearchCriteria = `Give me a list of 5 ${cinemaType} recommendations ${selectedCategories ? `that fit all of the following categories: ${selectedCategories}` : ''
        }. ${specificDescriptors
            ? `Make sure it fits the following actors and directors: ${specificDescriptors}.`
            : ''
        } ${selectedCategories || specificDescriptors
            ? `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${cinemaType}'s that I might like.`
            : ''
        } Please return this response as a numbered list with the ${cinemaType}'s title, followed by the imdb link to the ${cinemaType} `;

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

export default { getPayload,resultClean }