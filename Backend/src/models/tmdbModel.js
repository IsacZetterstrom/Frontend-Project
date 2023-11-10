
import "dotenv/config";
/**
* @author Oskar Dahlberg
* @Description Collect all movieinformation about the movies.
*/
async function getMovieInfo(movies) {    
    const moviesArray = [];
    for (const movie of movies.movielist) {
        const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${movie.title}`;
        const res = await fetch(url)
        const details = await res.json();
        if(details){
            moviesArray.push(details)
        }      
    }
    return  moviesArray ;
}

export default { getMovieInfo };
