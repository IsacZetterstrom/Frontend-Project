import React, { useEffect, useState } from 'react';
import TrailerComponent from '../components/DetailPage/TrailerComponent';
import MovieDesc from '../components/DetailPage/MovieDesc';
import { useParams } from 'react-router-dom';
import useFetchData from '../hooks/useFetchData';

function DetailPage() {
  const { movieId } = useParams();
  const { loading, err, data } = useFetchData(`/api/movies/${movieId}`);

  return (
    <>
      <div className="detailPageContainer">
      {err && <p>404 could not be found</p>}
      {loading ? <p>loading...</p> : (
        <>
          <TrailerComponent movie={data?.movie} />
          <MovieDesc movie={data?.movie} />
        </>
      )}
    </div>
    </>
  );
}

export default DetailPage;
