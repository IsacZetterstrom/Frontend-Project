import React from 'react'
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import TopList from '../components/LandingPageComp/TopMovies';
import UpcomingList from '../components/LandingPageComp/UpcomingMovies';
import Hero from '../components/LandingPageComp/Hero';
/**
 * @author Oskar dahlberg
 * @Description Toplist for most booked movies and unreleased movies. 
 */

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

  }, [])
  return (
    <>
      <Container>
        <Row className="justify-content-center text-center mt-4" md={2} >
          <Hero data={TopMovies[0]}></Hero>
        </Row>
      </Container>
      <Container>
        <Row className="justify-content-center text-center mt-4">
          <h2>Topplistan just nu</h2>
          <TopList data={TopMovies} ></TopList>
        </Row>
        <h2>Kommade filmer</h2>
        <Row>
          <UpcomingList data={UpcomingMovies}></UpcomingList>
        </Row>
      </Container>
    </>
  )
}

export default LandingPage