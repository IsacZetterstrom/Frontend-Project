import React from "react";
import { Container, Row , Image, Col } from "react-bootstrap";
import { Link } from "react-router-dom";




function RecMovieCard(props) {

    const imageStyle = {
        objectFit: 'cover',
        height: '300px', 
        width: '100%',
      };
    
console.log(props.movie.posterURL)
    return (   
        <Col xs={4} md={2} >
        <Link to={`${props.movie.imdbLink}`}>
        <Image src={`${props.movie.posterURL}`} fluid rounded style={imageStyle} />
        </Link>
        <p className="lh-1 mt-2">{props.movie.title}</p>
      </Col>
    )
}


export default RecMovieCard