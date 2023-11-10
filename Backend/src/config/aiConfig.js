
/**
* @author Oskar Dahlberg
* @Description Struct the movie dataset based on the user watched movies. 
*/
async function dataClean(movieDataArray) {
    console.log(movieDataArray)
    const actorsTable = new Set();
    const directorsTable = new Set();
    const genresTable = new Set();
    const titleTable = new Set();
    //Clean the data and takes no duplicates
    for (const movieData of movieDataArray) {
        for (const movie of movieData) {
            const actors = movie.Actors.split(',');
            for (const actor of actors) {
                actorsTable.add(actor);
            }
            directorsTable.add(movie.Director);
            genresTable.add(movie.Genre);
            titleTable.add(movie.Title)
        }
    }
    const actorsArray = Array.from(actorsTable);
    const directorsArray = Array.from(directorsTable);
    const genresArray = Array.from(genresTable);
    const titleArray = Array.from(titleTable)
    return { actorsArray, directorsArray, genresArray,titleArray }
}

/**
* @author Oskar Dahlberg
* @Description Sets the payload for the AI. 
    This can be heavely modified to get tv shows or suggest other stuff to the user based on data.
*/

async function getPayload(movieData) {
    const data = await dataClean(movieData);
    console.log("Current dataset:", data)
    //can switch to tv-shows exc if wanted
    let cinemaType = 'Movie';
    let selectedCategories = data.genresArray;
    let specificActors = data.actorsArray
    let specificDirectors = data.directorsArray;
    let specificMovies = data.titleArray;
    let fullSearchCriteria = `Give me a list of 5 ${cinemaType} recommendations 
    ${selectedCategories ? `that fit all of the following categories: ${selectedCategories}. Dont include ${specificMovies}.  ` : ''
        }. ${specificActors
            ? `Make sure it fits the following actors: ${specificActors} or directors: ${specificDirectors}.`
            : ''
        } ${selectedCategories || specificActors
            ? `If you do not have 5 recommendations that fit these criteria perfectly, do your best to suggest other ${cinemaType}'s that I might like.`
            : ''
        } Please return this response as a numbered list with the ${cinemaType}'s title, followed by the imdb link to the ${cinemaType} `;
   
        return fullSearchCriteria
}

export default { getPayload }