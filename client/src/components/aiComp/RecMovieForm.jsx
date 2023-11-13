import React from "react";
import { Form, Col } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";

function RecMovieForm(props) {
    const { loading, err, data } = useFetchData("profile/moviedata");
    console.log(data)

    if (data) {
        return (
            <>
                <Col md={6}>
                    <Form>
                        <Form.Label>Specifiera temperatur</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <p>Mindre oberäknelig </p>
                            <Form.Range className="p-4" />
                            <p>Mycket oberäknelig </p>
                        </div>
                        <Form.Label>Välj vilka filmer du vill inkludera</Form.Label>
                        {data.map((movie) => {
                            return (
                                <div key={movie[0].Movie_id} className="mb-3">
                                    <Form.Check
                                        inline
                                        label={movie[0].Title}
                                        name="movieCheckboxes"
                                        type="checkbox"
                                        id={`inline-${movie[0].Movie_id}`}
                                    />
                                </div>
                            );
                        })}

                    </Form>
                </Col>
            </>
        );

    }

};

export default RecMovieForm