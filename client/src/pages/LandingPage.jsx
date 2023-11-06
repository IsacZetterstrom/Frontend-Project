import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import MovieCarousel from "../components/MovieCarousel";
import TrailerComponent from "../components/TrailerComponent";
import useFetchData from "../hooks/useFetchData";
import AdCard from "../components/LandingPageComp/AdCard";

/**
 * @author Oskar dahlberg
 * @Description Toplist for most booked movies and unreleased movies.
 */

function LandingPage() {
  const { loading, err, data } = useFetchData("api/movies/1");
  return (
    <>
      <Container fluid className="m-0 p-0 landing-page">
        <Row className="justify-content-center w-100 m-0 p-0">
          {(loading && <p>laddar...</p>) || (err && <p>Ett fel har inträffat</p>) || (
            <>
              <TrailerComponent movie={data?.movie} />
              <h1 className="text-center m-0 p-0">{data.movie.Title}</h1>
            </>
          )}
        </Row>
        <Row className="justify-content-center w-100 mt-5 mb-5 p-0">
          <AdCard />
        </Row>
        <Row className="justify-content-center w-100 m-0 p-0">
          <div className="w-75">
            <h2 className="line pb-1 header-bold">Nyheter</h2>
            <MovieCarousel {...{ url: `/api/filter?query=toplist` }} />
            <h2 className="line pb-1 header-bold">Kommande</h2>
            <MovieCarousel {...{ url: `/api/filter?query=upcoming` }} />
          </div>
        </Row>
      </Container>
    </>
  );
}

export default LandingPage;
