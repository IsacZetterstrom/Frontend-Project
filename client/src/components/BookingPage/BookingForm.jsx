import React, { useEffect, useState } from "react";
import { useFormDefaults } from "../../hooks/useFormDefaults";
import { useParams } from "react-router-dom";
import { Container, Row, Form, Col } from "react-bootstrap";
import FormBtns from "../Forms/FormBtns";
import useFetchData from "../../hooks/useFetchData";
import fetchService from "../../service/FetchService";
import { useNavigate } from "react-router-dom";
/**
 * @author Louise Johansson
 * @description Booking form component for a movie screening. Allows users to confirm their booking and handles form submission.
 * Fetches user email if there is a logged-in user.
 * @param {Object} bookingInfo - Information about the booking (SeatId, Screening_id, Ticket_Type_id).
 * @param {number} sum - The total sum for the booking.
 */

function BookingForm({ bookingInfo, sum, setToggle, setConfirmationData, setShowBookingForm }) {
  const { defaults, formData, setFormData } = useFormDefaults();
  const { loading, err, data } = useFetchData("/profile/user");
  const { movieId, screeningId } = useParams();
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
        "POST",
        data
      );
      // handle response if ok, save response data in state, set error message otherwise
      if (response.ok) {
        const responseData = await response.json();
        setConfirmationData(responseData);
        setToggle(true);
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
    setShowBookingForm(false);
  };

  return (
    <Container className="form-wrapper booking-form">
      <Row>
        <Container className="border-top border-secondary mt-2 pt-4">
          <b>Totalsumma: {sum} kr</b>
          <p>Betalning sker på plats</p>
        </Container>
        <h2 className="p-0 text-nowrap mt-5 pb-2 line header-bold">Bekräfta din bokning</h2>
        <p>Fyll in e-post nedan för att ta emot dina biljetter</p>
        {msg && <p className="text-danger">{msg}</p>}
        <Form className="p-0" onSubmit={handleSubmit}>
          <Col className="mt-3">
            <label className="p-0 text-nowrap line d-block">E-Post</label>
            <input
              {...defaults("email", formData?.email || "", { minLength: 8, type: "email" })}
              value={formData?.email || ""}
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
