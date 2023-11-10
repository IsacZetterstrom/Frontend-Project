
import "dotenv/config";
/**
* @author Oskar Dahlberg
* @Description Collect poster pictures for the movies selected by AI. Can catch more information from API.
*/
async function getMovieInfo(movies) {
    console.log("this is the movie object:", movies.movielist)
    

    const moviesArray = [];
    for (const movie of movies.movielist) {
        console.log("running")
        const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${movie.title}`;
        const res = await fetch(url)
        const details = await res.json();      
        moviesArray.push(details)
    }
    return  moviesArray ;
}

export default { getMovieInfo };
