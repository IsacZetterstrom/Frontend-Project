import React from "react";
import { Container, Row , Image, Col, Spinner } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import RecMovieCard from "./RecMovieCard";

function RecMovies() {
   //const { loading, err, data } = useFetchData("profile/recommended");
  //console.log(data);
  const loading = false;
  const data = [
    {
      "title": "Mission: Impossible III",
      "imdbLink": "https://www.imdb.com/title/tt0317919/",
      "posterURL": "https://m.media-amazon.com/images/M/MV5BOThhNTA1YjItYzk2Ny00M2Y1LWJlYWUtZDQyZDU0YmY5Y2M5XkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg"
    },
    {
      "title": "Star Wars Episode II: Attack of the Clones",
      "imdbLink": "https://www.imdb.com/title/tt0121765/",
      "posterURL": "https://m.media-amazon.com/images/M/MV5BMDAzM2M0Y2UtZjRmZi00MzVlLTg4MjEtOTE3NzU5ZDVlMTU5XkEyXkFqcGdeQXVyNDUyOTg3Njg@._V1_SX300.jpg"
    },
    {
      "title": "The Last Samurai",
      "imdbLink": "https://www.imdb.com/title/tt0325710/",
      "posterURL": "https://m.media-amazon.com/images/M/MV5BMzkyNzQ1Mzc0NV5BMl5BanBnXkFtZTcwODg3MzUzMw@@._V1_SX300.jpg"
    },
    {
      "title": "Star Wars Episode III: Revenge of the Sith",
      "imdbLink": "https://www.imdb.com/title/tt0121766/",
      "posterURL": "https://m.media-amazon.com/images/M/MV5BNTc4MTc3NTQ5OF5BMl5BanBnXkFtZTcwOTg0NjI4NA@@._V1_SX300.jpg"
    },
    {
      "title": "Haywire",
      "imdbLink": "https://www.imdb.com/title/tt1506999/",
      "posterURL": "https://m.media-amazon.com/images/M/MV5BNjEyYWViNjEtMjVkNy00YzA2LTllMTctZjViOGRjMDQ2Njk5XkEyXkFqcGdeQXVyNTIzOTk5ODM@._V1_SX300.jpg"
    }
  ];


  if (loading) {
    return (
        <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

    if (data) {
      return (
        <>
            <h2 className="line pb-1 header-bold">Dina film rekommendationer</h2>
            <section>
                <p> Vi använder Open-AI för att rekommendera filmer åt våra användare. 
                Rekommendationerna är baserade på dina bokningar och vill du göra inställningar så klicka här.
                </p>
            </section>
             {data.map((movie) => (
            <RecMovieCard key={movie.title} movie={movie} />
          ))}
        </>
      );
    } 
    
    
    else {
      return (
        <p>För att ta del av våran AI tjänst måste du ha bokat en film.</p>
      );
    }
  }
  
  export default RecMovies;