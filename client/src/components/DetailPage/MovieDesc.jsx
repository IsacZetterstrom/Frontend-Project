import React from "react";
import { Container, Row, Col, Image } from "react-bootstrap";
import { formatDateString } from "../../utils/dateUtils";

/**
 * @author Louise Johansson
 * @description Renders the information about the film, takes in movie data from parent.
 */

function MovieDesc({ movie }) {
  // Calculate hours and minutes from the runtime in minutes
  const hours = Math.floor(movie.Runtime / 60);
  const minutes = movie.Runtime % 60;

  return (
    <Container className="movie-desc-container mt-2">
      <Row>
        <Col xs={5} sm={6} md={6} className="d-lg-none">
          <Image src={movie.Poster} alt={movie.Title} fluid className="max-200 max-300 poster" />
        </Col>
        <Col xs={7} sm={6} md={6} lg={12}>
          <h1 className="movie-title gold m-0">{movie.Title}</h1>
          <h2 className="header-light gold">Genre</h2>
          <p>{movie.Genre}</p>
          <h2 className="header-light gold">Beskrivning</h2>
          <p>{movie.About}</p>
          <h2 className="header-light gold">Längd</h2>
          <p>
            {hours} tim {minutes} min
          </p>
          <h2 className="header-light gold">Skådespelare</h2>
          <p>{movie.Actor_names}</p>
          <h2 className="header-light gold">Språk</h2>
          <p>{(movie.Lang === "EN" && "Engelska") || movie.Lang}</p>
          <h2 className="header-light gold">Släppt</h2>
          <p>{formatDateString(movie.Release_date).split('-')[0]}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieDesc;
