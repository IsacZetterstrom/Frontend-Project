import React from "react";
import { Image, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import IMDB_Logo from '../misc/IMDB_Logo.png'
import tempImage from '../misc/tempImage.png'
function RecMovieCard(props) {

  const imageSrc = props.movie.Poster ? `${props.movie.Poster}` : tempImage;

  return (
    <Col xs={4} md={2}>
      <div className="hovereffect">
        <Image src={imageSrc} fluid rounded className="recImage" />
        <div className="overlay">
          <h2>{props.movie.Title}</h2>
          <p>År: {props.movie.Year}</p>
          <p>Betyg: {props.movie.imdbRating}</p>
          <Link to={`https://www.imdb.com/title/${props.movie.imdbID}`}>
            <Image className="imdbLogo" src={IMDB_Logo} />
          </Link>
        </div>
      </div>
      <p  >{props.movie.Title}</p>
    </Col>
  );
};

export default RecMovieCard