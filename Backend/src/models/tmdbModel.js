
import "dotenv/config";

async function getMovieInfo(titles) {
    const moviesArray = [];
    for (const title of titles){
        const url = `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${title}`;
        const res = await fetch(url)
        const details =  await res.json();
        if(details.Poster){
            moviesArray.push(details.Poster)

        }else{
            moviesArray.push(null)
        }
    }
    return moviesArray;
}

export default { getMovieInfo };
