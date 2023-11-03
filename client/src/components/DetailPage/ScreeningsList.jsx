import React, { useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import { useNavigate } from "react-router-dom";
import { MdKeyboardArrowDown } from "react-icons/md";
import getDateWithDay, { formatDateOrTime, formatDateString } from "../../utils/dateUtils";

/**
 * @author Louise Johansson
 * @description Displays movie screening information, allowing users to select a date and view available showtimes.
 * movieId - The unique identifier of the movie, comes from parents params
 * movie - Information about the selected movie, comes from fetch in the parent.
 */

function ScreeningsList({ movieId, movie }) {
  const navigate = useNavigate();
  const today = new Date();
  const formattedDate = formatDateString(today);
  const [selectedDate, setSelectedDate] = useState(formattedDate);
  const [screeningsToShow, setScreeningsToShow] = useState(4);

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  const { loading, err, data } = useFetchData(`/api/movies/${movieId}/screenings/${selectedDate}`);

  const handleShowMore = () => {
    // Increment the number of screenings to show, initially its 4
    setScreeningsToShow(screeningsToShow + 4);
  };

  return (
    <Container className="screenig-list mt-4">
      <h2 className="mt-5 line-center text-center">Boka platser</h2>
      <Container className="date-picker-container text-center mt-5">
        <h3>Välj datum</h3>
        <input type="date" onChange={handleDateChange} className="date-picker" value={selectedDate} />
      </Container>
      {loading ? (
        <p>Laddar...</p>
      ) : (
        <>
          {data && data.length > 0 ? (
            <>
              <Table className="screening-table mt-5">
                <thead>
                  <tr>
                    <th>Startar</th>
                    <th>Salong, Språk och textning</th>
                    <th>Boka platser</th>
                  </tr>
                </thead>
                <tbody>
                  {data.slice(0, screeningsToShow).map((screening) => (
                    <tr key={screening.Screening_id}>
                      <td className="text-nowrap text-left">
                        <p className="m-0">{getDateWithDay(screening.Screening_date)}</p>
                        <p>{formatDateOrTime(screening.Screening_startime, "time")}</p>
                      </td>
                      <td className="text-nowrap text-left">
                        <p className="m-0">{screening.Theater_name}</p>
                        <p>{(movie.Lang === "EN" && "En") || movie.Lang} tal, {(screening.Subtitle === "Svenska" && "Sve") || screening.Subtitle} text</p>
                      </td>
                      <td className="text-center">
                        <Button
                          className="screening-btn text-nowrap"
                          onClick={() => navigate(`/film/${movie.Movie_id}/boka/${screening.Screening_id}`)}
                        >
                          Välj plats
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {data.length > screeningsToShow && (
                <Container className="text-center">
                  <Button className="show-more" onClick={handleShowMore}>
                    <p>Visa mer</p>
                    <MdKeyboardArrowDown />
                  </Button>
                </Container>
              )}
            </>
          ) : (
            <p className="text-center mt-4">Inga spelningar på valt datum.</p>
          )}
        </>
      )}
    </Container>
  );
}

export default ScreeningsList;
