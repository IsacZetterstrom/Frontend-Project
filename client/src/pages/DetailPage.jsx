import React from 'react'
import TrailerComponent from '../components/DetailPage/TrailerComponent'
import MovieDesc from '../components/DetailPage/MovieDesc'

function DetailPage() {
  const Movie = {
      status: 200,
      message: "Movie found",
      movie: {
        Movie_id: 1,
        Title: "Jack Reacher: Never Go Back",
        Release_date: "2016-10-19T00:00:00.000Z",
        Genre: "Action",
        Rating: 5.945,
        Director_name: "Edward Zwick",
        About: "When Major Susan Turner is arrested for treason, ex-investigator Jack Reacher undertakes the challenging task to prove her innocence and ends up exposing a shocking conspiracy.",
        Runtime: 118,
        Poster: "https://image.tmdb.org/t/p/original/cOg3UT2NYWHZxp41vpxAnVCOC4M.jpg",
        Image: "https://image.tmdb.org/t/p/original/ww1eIoywghjoMzRLRIcbJLuKnJH.jpg",
        Lang: "EN",
        Trailer: "https://www.youtube.com/watch?v=aRwrdbcAh2s",
        Actor_names: "Tom Cruise"
      }
  }

  return (
    <>
      <div className="detailPageContainer">
        <TrailerComponent movie={Movie.movie} />
        <MovieDesc movie={Movie.movie}/>
      </div>
    </>
  )
}

export default DetailPage