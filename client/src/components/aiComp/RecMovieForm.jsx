import React from "react";
import { Form, Col, Button, Alert } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import { useState, useEffect } from "react";
import FormRange from "./formComp/FormRange";
import FormCheckBox from "./formComp/FormCheckBox";
import FormSwitch from "./formComp/FormSwitch";
/**
 * @author Oskar Dahlberg
 * @description Form for customize the input against the ai. Default values are the movies you watched at cinema .
 */
function RecMovieForm({ sendFormDataToParent }) {
    const { loading, err, data } = useFetchData("profile/moviedata");
    const [selectedMovies, setSelectedMovies] = useState([]);
    const [temperature, setTemperature] = useState(70);
    const [isSwedish, setIsSwedish] = useState(false);

    useEffect(() => {
        if (data) {
            const formattedIds = data.map(id => ({ "Movie_id": id[0].Movie_id }));
            const formData = {
                "Movie_id": formattedIds,
                "Temp": 0.7,
                "isSwedish": false
            };
            
            sendFormDataToParent(formData)
        }
    }, [data]);

    const handleCollectInformation = () => {
        const formattedMovieIds = selectedMovies.map(id => {
            return { "Movie_id": id };
        });
        const formData =
        {
            "Movie_id": formattedMovieIds,
            "Temp": temperature,
            "isSwedish": isSwedish
        }
            ;
        sendFormDataToParent(formData);
    };
    if (data) {
        return (
            <>
                <Col md={8}>
                    <Form>
                        <Form.Label><h4>Specificera variationen på resultatet</h4></Form.Label>
                        <FormRange temperature={temperature} setTemperature={setTemperature}></FormRange>
                        <Alert variant="warning">
                            <p>
                                Ett högre värde leder till långsammare sökningar men mer kreativa resultat. Rekommenderat värde är mellan 0.7 - 1.
                            </p>
                        </Alert>
                        <Form.Label><h4>Välj filmer du tyckte om på bion</h4></Form.Label>
                        {data.map((movie, index) => {
                            return (
                                <FormCheckBox setSelectedMovies={setSelectedMovies}
                                    movie={movie}
                                    key={`${movie[0].Movie_id}_${index}`}>
                                </FormCheckBox>
                            );
                        })}
                        <FormSwitch isSwedish={isSwedish} setIsSwedish={setIsSwedish} ></FormSwitch>
                        <div className="d-flex flex-column align-items-center">
                            <Button className="edit-btn p-2 m-4" onClick={handleCollectInformation}>
                                Sök efter film
                            </Button>
                        </div>
                    </Form>
                </Col>
            </>
        );

    }

};

export default RecMovieForm