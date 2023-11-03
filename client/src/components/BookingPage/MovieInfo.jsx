import React from "react";
import { useParams } from "react-router-dom";
import useFetchData from "../../hooks/useFetchData";
import { Container, Row, Col, Image } from "react-bootstrap";
import getDateWithDay, { getMovieEndTime, formatDateStringToSwedish } from "../../utils/dateUtils";

/**
 * @author Sara Johansson
 * @description Fetches info about movie with hook useFetchData and renders it.
 */

function MovieInfo({ screeningData }) {
  const { movieId } = useParams();
  const { loading, err, data } = useFetchData(`/api/movies/${movieId}`);

  return (
    <Container className="movie-container mt-0 mb-4 mx-auto ml-0">
      <Row>
        {err && <p>Ett fel har inträffat</p>}
        {loading ? (
          <p>Laddar...</p>
        ) : (
          <>
            <Col xs={4} md={4} className="movie-poster">
              <Image src={data?.movie.Poster} alt="" fluid rounded />
            </Col>
            <Col xs={8} md={8}>
              <h2 className="movie-title mt-0 mb-2">{screeningData.Title}</h2>
              <p className="text-sm mb-0">{getDateWithDay(screeningData.Screening_date)}</p>
              <p className="text-sm mb-0">{getMovieEndTime(screeningData.Screening_startime, data?.movie.Runtime)}</p>
              <p className="text-sm mb-0">{screeningData.Theater_name}</p>
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default MovieInfo;
