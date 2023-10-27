import React, { useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import useFetchData from '../../hooks/useFetchData';
import { useNavigate } from 'react-router-dom';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { formatDateOrTime, formatDateString } from '../../utils/dateUtils';

function ScreeningsList({ movieId, movie }) {
    const navigate = useNavigate();
    const today = new Date();
    const formattedDate = formatDateString(today);
    const [selectedDate, setSelectedDate] = useState(formattedDate);
    const [showMore, setShowMore] = useState(false); // State to control the "Show More" button
    const [screeningsToShow, setScreeningsToShow] = useState(4); // Number of screenings to initially display

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const { loading, err, data } = useFetchData(`/api/movies/${movieId}/screenings/${selectedDate}`);

    const handleShowMore = () => {
        // Increment the number of screenings to show
        setScreeningsToShow(screeningsToShow + 2);
        setShowMore(true);
    };

    return (
        <Container className='screenig-list mt-4'>
            <h2 className='mt-5 line-center text-center'>Boka platser</h2>
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
                    <>
                        <Table className='screening-table mt-5 text-center'>
                            <thead>
                                <tr>
                                    <th>Starttid</th>
                                    <th>Salong</th>
                                    <th>Språk och text</th>
                                    <th>Boka platser</th>
                                </tr>
                            </thead>
                            <tbody>
                            {data.slice(0, screeningsToShow).map((screening) => (
                                <tr key={screening.Screening_id}>
                                    <td>{formatDateOrTime(screening.Screening_date, "date")}</td>
                                    <td>{screening.Theater_name} - {formatDateOrTime(screening.Screening_startime, "time")}</td>
                                    <td>{movie.Lang} tal, Sve text</td>
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
                        <Container className='text-center'>
                            <Button className='show-more' onClick={handleShowMore}><p>Visa mer</p><MdKeyboardArrowDown/></Button>
                        </Container>
                        
                    </>
                    ) : (
                        <p className='text-center mt-4'>Inga spelningar på valt datum.</p>
                    )}
                </>
            )}
        </Container>
    );
}

export default ScreeningsList;
