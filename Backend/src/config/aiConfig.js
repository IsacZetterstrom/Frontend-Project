
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
    let fullSearchCriteria = `Create a list of 5 ${cinemaType}'s. 
    ${selectedCategories ? ` ` : ''
        }. ${specificActors
            ? `Actors I like: ${specificActors}.
            Directors I like: ${specificDirectors}.
            Do not recommend any of these ${cinemaType}'s: ${specificMovies}.
            `
            : ''
        } `;
        console.log(fullSearchCriteria)
        return fullSearchCriteria
}

export default { getPayload }