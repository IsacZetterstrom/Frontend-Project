import React from 'react'
import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LibaryForm from '../components/LibaryPageComp/LibaryForm';
import GlobalMovieCard from '../components/GlobalMovieCard';

/**
 * @author Oskar dahlberg
 * @Description Sort / search/fiter movies that are on screen.
 */
function LibraryPage() {

  const [data, setData] = useState([]);
  const [query, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    (async () => {
      const response = await fetch(`/api/movies?filter=${filter}&sort=${sort}&search=${query}`);
      if (response.ok) {
        const data = await response.json();
        setData(data);
      } else {
        console.error('Failed to fetch data');
      }
    })();
  }, [query, sort, filter])

  return (
    <>
      <Container className="mt-5">
        <LibaryForm setSearch={setSearch} setSort={setSort} setFilter={setFilter}> </LibaryForm>
      </Container>
      <Container>
      <h1>Visas just nu på bio</h1>
        <Row>
          {data.map((movie) => (
            <GlobalMovieCard xs={6} md={4} id={movie.Movie_id} img={movie.Poster} title={movie.Title} />
          ))}
        </Row>
      </Container>
    </>
  )
}

export default LibraryPage