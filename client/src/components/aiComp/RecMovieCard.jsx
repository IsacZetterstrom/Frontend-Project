import React from "react";
import { Image, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import IMDB_Logo from '../misc/IMDB_Logo.png'
import tempImage from '../misc/tempImage.png'
/**
 * @author Oskar Dahlberg
 * @description Just a card to render out the movie cards.
 */
function RecMovieCard(props) {

  let imageSrc = props.movie.Poster;
  if(props.movie.Poster === "N/A"){
   imageSrc = tempImage;
  }

  return (
    <Col xs={4} md={3} lg={2}>
      <div className="hovereffect">
        <Image src={imageSrc} fluid rounded className="recImage" />
        <div className="overlay">
          <h2>{props.movie.Title}</h2>
          <p>År: {props.movie.Year}</p>
          <p>Betyg: {props.movie.imdbRating}</p>
          <Link to={`https://www.imdb.com/title/${props.movie.imdbID}`} target="_blank">
            <Image className="imdbLogo" src={IMDB_Logo} />
          </Link>
        </div>
      </div>
      <p  >{props.movie.Title}</p>
    </Col>
  );
};

export default RecMovieCard