import React, { useEffect, useState } from "react";
import { useFormDefaults } from '../../hooks/useFormDefaults';
import { useParams } from "react-router-dom";
import { Container, Row, Form, Col } from "react-bootstrap";
import FormBtns from "../Forms/FormBtns";
import useFetchData from '../../hooks/useFetchData';
import fetchService from "../../service/FetchService";

function BookingForm({ bookingInfo, sum }) {
    const { defaults, formData, setFormData } = useFormDefaults();
    const { loading, err, data } = useFetchData("/profile/user");
    const { movieId, screeningId } = useParams();
    const [confirmationData, setConfirmationData] = useState(null);
    const [msg, setMsg] = useState(null); // State for error message

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
  
        if (response.ok) {
            const responseData = await response.json(); 
            console.log('Booking was successful', responseData); 
            setConfirmationData(responseData);
          } else {
            const errorData = await response.json(); // Get error response data
            setMsg(errorData.error); // Set the error message
          }
      } catch (error) {
        console.error('Error:', error);
        setMsg("An error occurred during booking."); // Set a generic error message
      }
    };
  
    // Ensure data is fetched before rendering the form
    useEffect(() => {
      if (data && data.email) {
        setFormData({ email: data.email });
      }
    }, [data, setFormData]);
  
    return (
      <Container className="form-wrapper">
        <Row>
          <h1 className="p-0 text-nowrap mt-5 mb-5 pb-2 line">Bekräfta din bokning</h1>
          <h2>Movie titel</h2>
          <p>Tisdag, 24 oktober</p>
          <p>Salong Stora rummet</p>
          <p>Totalsumma: {sum}</p>
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
              {...{ submitBtn: "Boka", cancelBtn: "Avbryt", showCancelBtn: true, setFormData }}
            />
          </Form>
        </Row>
      </Container>
    );
}

export default BookingForm;
