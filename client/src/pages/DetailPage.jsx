import React, { useEffect, useState } from 'react';
import TrailerComponent from '../components/DetailPage/TrailerComponent';
import MovieDesc from '../components/DetailPage/MovieDesc';
import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';
import { Container } from 'react-bootstrap';
import ScreeningsList from '../components/DetailPage/ScreeningsList';

function DetailPage() {
  const { movieId } = useParams();
  const { loading, err, data } = useFetchData(`/api/movies/${movieId}`);

  return (
    <>
      <Container fluid className="detailPageContainer m-0 p-0">
      {err && <p>404 could not be found</p>}
      {loading ? <p>loading...</p> : (
        <>
          {/* <TrailerComponent movie={data?.movie} />
          <MovieDesc movie={data?.movie} /> */}
        </>
      )}
     </Container>
      {/* <ScreeningsList movie={data?.movie} movieId={movieId}/> */}
    </>
  );
}

export default DetailPage;
