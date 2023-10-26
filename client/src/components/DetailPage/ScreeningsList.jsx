import React from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useFetchData from '../../hooks/useFetchData';

function ScreeningsList({ movieId, movie }) {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];

    const { loading, err, data } = useFetchData(`/api/movies/${movieId}/screenings/2024-04-10`);
    console.log(data)

    return (
    <Container className='screenig-list'>
        {err && <p>Ett fel har inträffat</p>}
        {loading ? (
        <p>Laddar...</p>
        ) : (
        <>
            <h2 className='text-center'>Boka platser</h2>
            <Table className='screening-table' hover>
                <thead>
                    <tr>
                        <th>Starttid</th>
                        <th>Salong</th>
                        <th>Film</th>
                        <th></th>
                    </tr>
                </thead>
                {data && data.length > 0 ? (
                    data.map((screening) => (
                    <tr key={screening.Screening_id}>
                        <td>{screening.Screening_startime} - {screening.Screening_startime}</td>
                        <td>{screening.Theater_name}</td>
                        <td>{movie.Lang} tal - Sve text</td>
                        <td><Button className='screening-btn'>Välj plats</Button></td>
                    </tr>
                    ))
                ) : (
                    <p>Inga spelningar på valt datum.</p>
                )}
            </Table>
        </>
        )}
    </Container>
    );
}

export default ScreeningsList;
