import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import { formatDate, formatTime } from '../../utils/dateUtils';

function ScreeningsList({ movieId, movie }) {
    const navigate = useNavigate();
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const [selectedDate, setSelectedDate] = useState(formattedDate);

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const { loading, err, data } = useFetchData(`/api/movies/${movieId}/screenings/${selectedDate}`);

    return (
        <Container className='screenig-list mt-4'>
            <h2 className='text-center mt-5'>Boka platser</h2>
            <Container className='date-picker-container text-center mt-5'>
                <h3>Välj datum</h3>
                <input
                    type="date"
                    onChange={handleDateChange}
                    className='date-picker'
                    value={selectedDate}
                />
            </Container>
            {loading ? (
                <p>Laddar...</p>
            ) : (
                <>
                    {data && data.length > 0 ? (
                    <Table className='screening-table mt-5'>
                        <thead>
                            <tr>
                                <th>Starttid</th>
                                <th>Salong</th>
                                <th>Språk och text</th>
                                <th>Boka platser</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((screening) => (
                                <tr key={screening.Screening_id}>
                                    <td>{formatDate(screening.Screening_startime)}</td>
                                    <td>{screening.Theater_name} - {formatTime(screening.Screening_startime)}</td>
                                    <td>{movie.Lang} tal - Sve text</td>
                                    <td>
                                        <Button
                                            className='screening-btn'
                                            onClick={() => navigate(`/film/${movie.Movie_id}/boka/${screening.Screening_id}`)}
                                        >
                                            Välj plats
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    ) : (
                        <p>Inga spelningar på valt datum.</p>
                    )}
                </>
            )}
        </Container>
    );
}

export default ScreeningsList;
