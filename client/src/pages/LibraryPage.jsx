import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import GlobalMovieCard from "../components/GlobalMovieCard";
import { useFormDefaults } from "../hooks/useFormDefaults";
import useFetchData from "../hooks/useFetchData";
import Hero from "../components/LibaryPageComp/Hero";
import useQueryMovie from "../hooks/useQuaryMovie";
import SearchFilterSortQuery from "../components/LibaryPageComp/SearchFilterSortQuery";

/**
 * @author Oskar dahlberg
 * @Description Sort / search/fiter movies that are on screen.
 */
function LibraryPage() {
  const { defaults, formData: query } = useFormDefaults();
  const { loading, err, data } = useQueryMovie(query.search, query.sort, query.filter);
  const { loading: isLoading, err: error, data: heroData } = useFetchData("api/movies/1");

  return (
    <>
      <Container className="mt-5 d-flex flex-column align-items-center justify-content-center library-page">
        <Row className="justify-content-center p0 m-0 w-75 hero-container">
          {(isLoading && <p>laddar...</p>) || (error && <p>Error</p>) || (
            <>
              <h1 className="line pb-2">Populär just nu</h1>
              <Hero {...{ heroData }} />
              <h1 className="text-center mb-5 p-1 hero-title">{heroData.movie.Title}</h1>
            </>
          )}
        </Row>
        <SearchFilterSortQuery {...{ defaults }} />
        <Row className="w-75">
          <h1 className="line pb-2">På bio nu</h1>
          {(loading && <p>laddar...</p>) ||
            (err && <p>Hittade ingen film som matchar {query.search}</p>) ||
            data?.map((movie) => <GlobalMovieCard key={movie.Movie_id} xs={6} md={3} id={movie.Movie_id} img={movie.Poster} title={movie.Title} />)}
        </Row>
      </Container>
    </>
  );
}

export default LibraryPage;
