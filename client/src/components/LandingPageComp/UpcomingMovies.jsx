import GlobalMovieCard from '../GlobalMovieCard';
/**
 * @author Oskar dahlberg
 * @Description Unreleased upcoming movies
 */
function UpcomingMovies({data}) {
    if(data){
    return (
        <>
           {data.map((movie,index) => (        
            <GlobalMovieCard xs={4} md={2} id={movie.Movie_id} img={movie.Poster} title={movie.Title} />
          ))}  
        </>
    )
  }
}

export default UpcomingMovies