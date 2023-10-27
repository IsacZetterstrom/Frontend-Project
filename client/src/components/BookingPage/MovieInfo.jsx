import React from 'react';
import { useParams } from "react-router-dom";
import useFetchData from '../../hooks/useFetchData'
import { Container, Row, Col, Image } from 'react-bootstrap';
import { getMovieEndTime, formatDateToSwedish } from '../../utils/dateUtils';

/**
 * @author Sara Johansson
 * @description Fetches info about movie with hook useFetchData and renders it. 
 */

function MovieInfo({screeningData}) {
    const { movieId } = useParams();
    const { loading, err, data } = useFetchData(`/api/movies/${movieId}`);
    
    return (
        <Container className='movieContainer mt-4 mb-4 flex-column'>
            <Row>
            {err && <p>Ett fel har inträffat</p>}
            {loading ? <p>Laddar...</p> : (
                <>
                    <Col xs={4} md={4} className='moviePoster'>
                    <Image src={data?.movie.Poster} alt='' fluid />
                    </Col>
                    <Col xs={8} md={8}>
                        <h2 className='movieTitle mb-2'>{screeningData.Title}</h2>
                        <p className='text-sm mb-0'>{formatDateToSwedish(screeningData.Screening_date)}</p>
                        <p className='text-sm mb-0'>{getMovieEndTime(screeningData.Screening_startime, data?.movie.Runtime)}</p>
                        <p className='text-sm mb-0'>{screeningData.Theater_name}</p>
                    </Col>
                </>
            )}                
            </Row>
        </Container>
    );
}

export default MovieInfo;