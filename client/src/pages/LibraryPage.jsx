import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import GlobalMovieCard from "../components/GlobalMovieCard";
import useQuaryMovie from "../hooks/useQuaryMovie";
import { useFormDefaults } from "../hooks/useFormDefaults";
import SearchFilterSortQuary from "../components/LibaryPageComp/SearchFilterSortQuary";

/**
 * @author Oskar dahlberg
 * @Description Sort / search/fiter movies that are on screen.
 */
function LibraryPage() {
  const { defaults, formData: quary } = useFormDefaults();
  const { loading, err, data } = useQuaryMovie(quary.search, quary.sort, quary.filter);

  return (
    <>
      <Container className="mt-5 library-page">
        <SearchFilterSortQuary {...{ defaults }} />
        <Row>
          <h1 className="line pb-2">På bio nu</h1>
          {(loading && <p>laddar....</p>) ||
            (err && <p>Hittade inte filmerna</p>) ||
            data?.map((movie) => <GlobalMovieCard key={movie.Movie_id} xs={6} md={3} id={movie.Movie_id} img={movie.Poster} title={movie.Title} />)}
        </Row>
      </Container>
    </>
  );
}

export default LibraryPage;
