
import GlobalMovieCard from '../GlobalMovieCard';

function TopMovies({data}) {


  if(data){
    return (
      <>
         {data.map((movie,index) => (        
          <GlobalMovieCard xs={4} md={2} id={movie.Movie_id} img={movie.Poster} title={movie.Title} index={index+1} />
        ))}  
      </>
  )
  }
   
}

export default TopMovies