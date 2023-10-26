import React from 'react';
import { Container } from 'react-bootstrap';
import useFetchData from '../../hooks/useFetchData';

function ScreeningsList({ movieId }) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    console.log(formattedDate);

    const { loading, err, data } = useFetchData(`/api/movies/${movieId}/screenings/2024-04-10`);

    return (
    <Container>
        {err && <p>404 could not be found</p>}
        {loading ? (
        <p>loading...</p>
        ) : (
        <>
            <h2 className='centeredTitle'>Boka platser</h2>
            <ul>
            {data && data.screenings ? (
                data.screenings.map((screening) => (
                <li key={screening.Screening_id}>
                    <p>{screening.Title}</p>
                    <p>{screening.Theater_name}</p>
                    <p>{screening.Screening_startime}</p>
                </li>
                ))
            ) : (
                <p>No screenings found.</p>
            )}
            </ul>
        </>
        )}
    </Container>
    );
}

export default ScreeningsList;
