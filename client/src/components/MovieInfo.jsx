import React, { useState, useEffect } from 'react';
import useFetchData from '../hooks/useFetchData';
import '../styling/components/_movieInfo.scss'
import { Container, Row, Col, Image } from 'react-bootstrap';

/**
 * @author Sara Johansson
 * @description lalala
 */


function MovieInfo({movie}) {

    return (
        <Container className='movieContainer mt-4 flex-column'>
            <Row>
                <Col xs={6} md={6} className='moviePoster d-lg-none'>
                    <Image src='' alt='' fluid className="max-200 max-300" /><p>BILD</p>
                </Col>
                <Col xs={6} md={6}>
                    <h2 className='movieTitle mb-2'>Oppenheimer</h2>
                    <p className='text-sm mb-0'>Fredag, 24 oktober</p>
                    <p className='text-sm mb-0'>Kl. 17.00 - 18.45</p>
                    <p className='text-sm mb-0'></p>
                    <p className='text-sm mb-0'>Salong 7</p>
                </Col>
            </Row>
        </Container>
    );
}

export default MovieInfo;