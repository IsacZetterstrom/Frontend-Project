import React from 'react'
import { useState,useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import LibaryForm from '../components/LibaryPageComp/LibaryForm';
import GlobalMovieCard from '../components/GlobalMovieCard';
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
    <Container >
    <LibaryForm> </LibaryForm>
    </Container>
    <Container>
      <Row>
        {data.map((movie) => (
        <GlobalMovieCard xs={6} md={4} id={movie.Movie_id} img={movie.Poster} title ={movie.Title}/>     
        ))}
        </Row>
    </Container>
    </>
  )
}

export default LibraryPage