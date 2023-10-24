import React from 'react'
import { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { Link } from 'react-router-dom';

function LibraryPage() {
//http://localhost:3050/api/movies?filter=&sort=&search=
  const [data, setData] = useState([]);
  useEffect(() => {
    (async () => {
        const response = await fetch('/api/movies?filter=&sort=&search=');
        if (response.ok) {
          const data = await response.json();
          setData(data);
          console.log(data)
        } else {
          console.error('Failed to fetch data');
        }
    })();

}, [])



  return (
    <>
    <h1>Libarypage</h1>
    <Container>
      <Row>
        {data.map((movie) => (
          <Col xs={6} md={4} key={movie.id}>
                 <Link to={`/film/${movie.Movie_id}`}>
                           {/* Use card later */} 
                        <Image src={`${movie.Poster}`} fluid rounded  />
                        {movie.Title} 
                 </Link>
  
          </Col>
        ))}
        </Row>
            </Container>
        </>
  )
}

export default LibraryPage