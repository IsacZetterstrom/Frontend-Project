import React from "react";
import { Container, Row , Image, Col, Spinner } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import RecMovieCard from "./RecMovieCard";

function RecMovies() {
 // const { loading, err, data } = useFetchData("profile/recommended");
  //console.log(data);
  const loading = false;
 const data = [
  {
      "Title": "Trainspotting",
      "Year": "1996",
      "Rated": "R",
      "Released": "09 Aug 1996",
      "Runtime": "93 min",
      "Genre": "Drama",
      "Director": "Danny Boyle",
      "Writer": "Irvine Welsh, John Hodge",
      "Actors": "Ewan McGregor, Ewen Bremner, Jonny Lee Miller",
      "Plot": "Renton, deeply immersed in the Edinburgh drug scene, tries to clean up and get out, despite the allure of the drugs and influence of friends.",
      "Language": "English",
      "Country": "United Kingdom",
      "Awards": "Nominated for 1 Oscar. 23 wins & 35 nominations total",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMzA5Zjc3ZTMtMmU5YS00YTMwLWI4MWUtYTU0YTVmNjVmODZhXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "8.1/10"
          },
          {
              "Source": "Rotten Tomatoes",
              "Value": "90%"
          },
          {
              "Source": "Metacritic",
              "Value": "83/100"
          }
      ],
      "Metascore": "83",
      "imdbRating": "8.1",
      "imdbVotes": "710,874",
      "imdbID": "tt0117951",
      "Type": "movie",
      "DVD": "19 Dec 2015",
      "BoxOffice": "$16,491,080",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "Thor: Love and Thunder",
      "Year": "2022",
      "Rated": "PG-13",
      "Released": "08 Jul 2022",
      "Runtime": "118 min",
      "Genre": "Action, Adventure, Comedy",
      "Director": "Taika Waititi",
      "Writer": "Taika Waititi, Jennifer Kaytin Robinson, Stan Lee",
      "Actors": "Chris Hemsworth, Natalie Portman, Christian Bale",
      "Plot": "Thor enlists the help of Valkyrie, Korg and ex-girlfriend Jane Foster to fight Gorr the God Butcher, who intends to make the gods extinct.",
      "Language": "English",
      "Country": "Australia, United States",
      "Awards": "1 win & 18 nominations",
      "Poster": "https://m.media-amazon.com/images/M/MV5BYmMxZWRiMTgtZjM0Ny00NDQxLWIxYWQtZDdlNDNkOTEzYTdlXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "6.2/10"
          },
          {
              "Source": "Rotten Tomatoes",
              "Value": "63%"
          },
          {
              "Source": "Metacritic",
              "Value": "57/100"
          }
      ],
      "Metascore": "57",
      "imdbRating": "6.2",
      "imdbVotes": "380,509",
      "imdbID": "tt10648342",
      "Type": "movie",
      "DVD": "08 Sep 2022",
      "BoxOffice": "$343,256,830",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "V for Vendetta",
      "Year": "2005",
      "Rated": "R",
      "Released": "17 Mar 2006",
      "Runtime": "132 min",
      "Genre": "Action, Drama, Sci-Fi",
      "Director": "James McTeigue",
      "Writer": "Lilly Wachowski, Lana Wachowski, David Lloyd",
      "Actors": "Hugo Weaving, Natalie Portman, Rupert Graves",
      "Plot": "In a future British dystopian society, a shadowy freedom fighter, known only by the alias of \"V\", plots to overthrow the tyrannical government - with the help of a young woman.",
      "Language": "English, French, Latin, Spanish",
      "Country": "United States, United Kingdom, Germany",
      "Awards": "7 wins & 29 nominations",
      "Poster": "https://m.media-amazon.com/images/M/MV5BOTI5ODc3NzExNV5BMl5BanBnXkFtZTcwNzYxNzQzMw@@._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "8.2/10"
          },
          {
              "Source": "Rotten Tomatoes",
              "Value": "73%"
          },
          {
              "Source": "Metacritic",
              "Value": "62/100"
          }
      ],
      "Metascore": "62",
      "imdbRating": "8.2",
      "imdbVotes": "1,158,104",
      "imdbID": "tt0434409",
      "Type": "movie",
      "DVD": "01 May 2008",
      "BoxOffice": "$70,511,035",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "Spanglish",
      "Year": "2004",
      "Rated": "PG-13",
      "Released": "17 Dec 2004",
      "Runtime": "131 min",
      "Genre": "Comedy, Drama, Romance",
      "Director": "James L. Brooks",
      "Writer": "James L. Brooks",
      "Actors": "Adam Sandler, Téa Leoni, Paz Vega",
      "Plot": "A woman and her daughter emigrate from Mexico for a better life in America, where they start working for a family whose patriarch is a newly-celebrated chef with an insecure wife.",
      "Language": "English, Spanish",
      "Country": "United States",
      "Awards": "5 wins & 15 nominations",
      "Poster": "https://m.media-amazon.com/images/M/MV5BMzVkY2UzZTYtNzg1ZS00NDdkLWE3OTItNTFkM2FjODM0ZmUzXkEyXkFqcGdeQXVyMTUyOTc1NDYz._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "6.4/10"
          },
          {
              "Source": "Rotten Tomatoes",
              "Value": "54%"
          },
          {
              "Source": "Metacritic",
              "Value": "48/100"
          }
      ],
      "Metascore": "48",
      "imdbRating": "6.4",
      "imdbVotes": "87,583",
      "imdbID": "tt0371246",
      "Type": "movie",
      "DVD": "16 Apr 2012",
      "BoxOffice": "$42,726,869",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  },
  {
      "Title": "Rocky Balboa",
      "Year": "2006",
      "Rated": "PG",
      "Released": "20 Dec 2006",
      "Runtime": "102 min",
      "Genre": "Action, Drama, Sport",
      "Director": "Sylvester Stallone",
      "Writer": "Sylvester Stallone",
      "Actors": "Sylvester Stallone, Antonio Tarver, Milo Ventimiglia",
      "Plot": "Thirty years after the ring of the first bell, Rocky Balboa comes out of retirement and dons his gloves for his final fight against the reigning heavyweight champ Mason 'The Line' Dixon.",
      "Language": "English, Spanish",
      "Country": "United States",
      "Awards": "4 nominations",
      "Poster": "https://m.media-amazon.com/images/M/MV5BNWIyNmQyNjctYmVmMS00MGI4LWIxMmUtNjA0ODYzOTA0Yjk0L2ltYWdlXkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_SX300.jpg",
      "Ratings": [
          {
              "Source": "Internet Movie Database",
              "Value": "7.1/10"
          },
          {
              "Source": "Rotten Tomatoes",
              "Value": "78%"
          },
          {
              "Source": "Metacritic",
              "Value": "63/100"
          }
      ],
      "Metascore": "63",
      "imdbRating": "7.1",
      "imdbVotes": "228,046",
      "imdbID": "tt0479143",
      "Type": "movie",
      "DVD": "31 Oct 2015",
      "BoxOffice": "$70,270,943",
      "Production": "N/A",
      "Website": "N/A",
      "Response": "True"
  }
]
   


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
            <h2 className="line pb-1 header-bold mt-3">Dina filmrekommendationer</h2>
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