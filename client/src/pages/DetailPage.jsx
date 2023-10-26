import React, { useEffect, useState } from 'react';
import TrailerComponent from '../components/DetailPage/TrailerComponent';
import MovieDesc from '../components/DetailPage/MovieDesc';
import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import { Container } from 'react-bootstrap';

/**
 * @author Louise Johansson
 * @description Renders the information about the film based on the movie id. Movie id comes from params, fetches with useFetchData hook.
 */

function DetailPage() {
  const { movieId } = useParams();
  const { loading, err, data } = useFetchData(`/api/movies/${movieId}`);

  return (
    <>
      <Container fluid className="detailPageContainer m-0 p-0">
      {err && <p>Ett fel har inträffat</p>}
      {loading ? <p>laddar...</p> : (
        <>
          <TrailerComponent movie={data?.movie} />
          <MovieDesc movie={data?.movie} />
        </>
      )}
    </Container>
    </>
  );
}

export default DetailPage;
