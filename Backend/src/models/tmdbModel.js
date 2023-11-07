
import "dotenv/config";

async function getMovieInfo(titles) {
    const moviesArray = [];
    const posterURL = "https://image.tmdb.org/t/p/original"
    for (const title of titles){
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.THEMOVIE_API_KEY}&query=${title}`;
        const res = await fetch(url)
        const details =  await res.json();
        const movieDetails = details.results[0];
        movieDetails.full_poster_url = posterURL + movieDetails.poster_path;
        console.log(movieDetails.full_poster_url)
        moviesArray.push(movieDetails.full_poster_url)
    }
    return moviesArray;
}

export default { getMovieInfo };
