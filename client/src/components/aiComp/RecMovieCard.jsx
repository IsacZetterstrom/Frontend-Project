import React from "react";
import { useState,useRef } from "react";
import { Container, Row , Image, Col,Overlay, Button,OverlayTrigger,Tooltip  } from "react-bootstrap";
import { Link } from "react-router-dom";
import IMDB_Logo from '../misc/IMDB_Logo.png'

function RecMovieCard(props) {
  const [show, setShow] = useState(false);
  const target = useRef(null);
    const imageStyle = {
        objectFit: 'cover',
        height: '290px', 
        width: '100%',
      };
  

    
console.log(props.movie)
    return (   
      <Col xs={4} md={2}>
 <div class="hovereffect">
 <Image src={`${props.movie.Poster}`} fluid rounded style={imageStyle} />
        <div class="overlay">
            <h2>{props.movie.Title}</h2>
            <p>År: {props.movie.Year}</p>
            <p>Betyg: {props.movie.imdbRating}</p>
            <a class="info" href="#">link here</a>
            <Image style={{ width: '50px', height: 'auto' }} src={IMDB_Logo} />
        </div>
    </div>

    <p  >{props.movie.Title}</p>

    </Col>
  );
};

export default RecMovieCard