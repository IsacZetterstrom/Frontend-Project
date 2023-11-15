
import "dotenv/config";
/**
* @author Oskar Dahlberg
* @Description Collect all movieinformation about the movies.
*/
async function getMovieInfo(movies) {    
    const moviesArray = [];
    const moviesToFetch = movies.movielist.slice(0, 5);
    for (const movie of moviesToFetch) {
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
