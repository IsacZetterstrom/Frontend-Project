import React from 'react'
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TopList from '../components/LandingPageComp/TopMovies';
import UpcomingList from '../components/LandingPageComp/UpcomingMovies';
import Hero from '../components/LandingPageComp/Hero';
function LandingPage() {

  const [TopMovies, setTopMovies] = useState([]);
  const [UpcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/filter?query=toplist`);
      if (response.ok) {
        const data = await response.json();
        setTopMovies(data);
      } else {
        console.error('Failed to fetch data');
      }
    })();
    (async () => {
      const response = await fetch(`/api/filter?query=upcoming`);
      if (response.ok) {
        const data = await response.json();
        setUpcomingMovies(data);
      } else {
        console.error('Failed to fetch data');
      }
    })();
    console.log(TopMovies[0])
  }, [])
  return (
    <>
    <h1>Landingpage</h1>
<Container>
  <Row className="justify-content-center text-center" md={2}>
  <Hero data={TopMovies[0]}></Hero>
  </Row>
</Container>
 
    <Container>
      <h2>Topplistan just nu</h2>
      <Row className="justify-content-center text-center">
        <TopList data={TopMovies}></TopList>
      </Row>
      <h2>Kommade filmer</h2>
      <Row className="justify-content-center text-center">
        <UpcomingList data={UpcomingMovies}></UpcomingList>
      </Row>
    </Container>

    </>
  )
}

export default LandingPage