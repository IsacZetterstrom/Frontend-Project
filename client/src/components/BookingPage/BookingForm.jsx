import React, { useEffect, useState } from "react";
import { useFormDefaults } from '../../hooks/useFormDefaults';
import { useParams } from "react-router-dom";
import { Container, Row, Form, Col } from "react-bootstrap";
import FormBtns from "../Forms/FormBtns";
import useFetchData from '../../hooks/useFetchData';
import fetchService from "../../service/FetchService";
import { useNavigate } from 'react-router-dom';

/**
 * @author Louise Johansson
 * @description Booking form component for a movie screening. Allows users to confirm their booking and handles form submission. 
 * Fetches user email if there is a logged-in user.
 * @param {Object} bookingInfo - Information about the booking (SeatId, Screening_id, Ticket_Type_id).
 * @param {number} sum - The total sum for the booking.
 */

function BookingForm({ bookingInfo, sum }) {
    const { defaults, formData, setFormData } = useFormDefaults();
    const { loading, err, data } = useFetchData("/profile/user");
    const { movieId, screeningId } = useParams();
    const [confirmationData, setConfirmationData] = useState(null);
    const [msg, setMsg] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Check if email is filled in
      if (!formData.email) return false;
  
      // Create the data object to send in the POST request
      const data = {
        tickets: bookingInfo.tickets,
        email: formData.email, 
      };
  
      // Send the post request to the backend
      try {
        const response = await fetchService.fetchRes(
          `/api/movies/${movieId}/screenings/${screeningId}/booking`,
          'POST',
          data
        );
        // handle response if ok, save response data in state, set error message otherwise
        if (response.ok) {
            const responseData = await response.json(); 
            setConfirmationData(responseData);
          } else {
            const errorData = await response.json();
            setMsg(errorData.error);
          }
      } catch (error) {
        setMsg("Ett fel har inträffat vid bokningen.");
      }
    };
  
    // Ensure data is fetched before rendering the form
    useEffect(() => {
      if (!loading && !err && data && data.email) {
        setFormData({ email: data.email });
      }
    }, [data, loading, err, setFormData]);
  
    // Navigate the user back to the movie page
    const handleCancel = () => {
      navigate(`/film/${movieId}`);
    };

    return (
      <Container className="form-wrapper">
        <Row>
          <h1 className="p-0 text-nowrap mt-5 pb-2 line">Bekräfta din bokning</h1>
          <p>Fyll in e-post nedan för att ta emot dina biljetter</p>
          <h2 className="movie-title">Movie titel</h2>
          <p>Tisdag, 24 oktober</p>
          <p>Salong Stora rummet</p>
          <hr />
          <b>Totalsumma: {sum} kr</b>
          <p>Betalning sker i på plats</p>
          {msg && <p className="text-danger">{msg}</p>}
          <Form className="p-0" onSubmit={handleSubmit}>
            <Col className="mt-3">
              <label className="p-0 text-nowrap line d-block">E-Post</label>
              <input
                {...defaults("email", formData?.email || '', { minLength: 8, type: "email" })}
                value={formData?.email || ''}
              />
            </Col>
            <FormBtns
              {...{ submitBtn: "Boka", cancelBtn: "Avbryt", showCancelBtn: true, setFormData, runFunction: handleCancel }}
            />
          </Form>
        </Row>
      </Container>
    );
}

export default BookingForm;
