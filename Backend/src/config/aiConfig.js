
/**
* @author Oskar Dahlberg
* @Description Struct the movie dataset based on the user watched movies. 
*/
async function dataClean(movieDataArray) {
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
    const data = await dataClean(movieData.movieInformation);
    //can switch to tv-shows exc if wanted
    let cinemaType = 'Movie';
    let specificActors = data.actorsArray
    let specificDirectors = data.directorsArray;
    let specificMovies = data.titleArray;
    let fullSearchCriteria = `Create a list of 5 ${cinemaType} titles in english that might fit my profile. 
    ${movieData.isSwedish ? `${cinemaType}'s must be swedish` : ''
        }. ${specificActors
            ? `Actors I like: ${specificActors}.
            Directors I like: ${specificDirectors}.
            Do not recommend any of these ${cinemaType}'s: ${specificMovies}.
            `
            : ''
        } `;
      const temp = movieData.Temp / 100
       const payLoad = {
            model: "gpt-4-1106-preview",
            temperature: temp,
            messages: [
              {
                role: "user",
                content: fullSearchCriteria,
              },
            ],
            functions: [
              {
                name: "get_movielist",
                description: "Get a list of movies from query.",
                parameters: {
                  type: "object",
                  properties: {
                    movielist: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          title: {
                            type: "string",
                            description: "The title of the movie.",
                          },
                        },
                      },
                    },
                  },
                  required: ["movielist"],
                },
              },
            ],
            function_call: "auto",
          }
        return payLoad
}

export default { getPayload }