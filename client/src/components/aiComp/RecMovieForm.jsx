import React from "react";
import { Form, Col, Button } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import { useState, useEffect } from "react";
function RecMovieForm({sendFormDataToParent}) {
    const { loading, err, data } = useFetchData("profile/moviedata");
    console.log(data)
  
   

    const [selectedMovies, setSelectedMovies] = useState([]);
    const [temperature, setTemperature] = useState(70);
    const [isSwedish, setIsSwedish] = useState(false);
    const [formData, setFormData] = useState();
    
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
   
    const handleTemperatureChange = (e) => {
        setTemperature(e.target.value);
    };
    const handleSwitchChange = () => {
        setIsSwedish(!isSwedish);
    };
    const handleMovieCheckboxChange = (movieId, checked) => {
        if (checked) {
          setSelectedMovies((prevSelectedMovies) => [...prevSelectedMovies, movieId]);
        } else {
          setSelectedMovies((prevSelectedMovies) =>
            prevSelectedMovies.filter((id) => id !== movieId)
          );
        }
      };
    const handleCollectInformation = () => {
        console.log(selectedMovies)
        const formattedMovieIds = selectedMovies.map(id => {
            return { "Movie_id": id };
          });
        const formData = 
            {
            "Movie_id": formattedMovieIds ,
            "Temp": temperature,
            "isSwedish": isSwedish
            }
        ;
        console.log(formData)

        setFormData(formData);
        sendFormDataToParent(formData);
    };

    if (data) {
        return (
            <>
                <Col md={6}>
                    <Form>
                        <Form.Label>Specifiera temperatur</Form.Label>
                        <div className="d-flex justify-content-between align-items-center">
                            <p>Mindre oberäknelig </p>
                            <Form.Range className="p-4"
                                onChange={handleTemperatureChange}
                                value={temperature}
                                min={1}
                                max={200}
                            />
                            <p>Mycket oberäknelig </p>
                        </div>
                        <Form.Label>Välj vilka filmer du tyckte om på bion.</Form.Label>
                        {data.map((movie) => {
                            return (
                                <div key={movie[0].Movie_id} className="mb-3">
                                    <Form.Check
                                        inline
                                        label={movie[0].Title}
                                        name="movieCheckboxes"
                                        type="checkbox"
                                        id={`inline-${movie[0].Movie_id}`}
                                        onChange={(e) =>
                                            handleMovieCheckboxChange(movie[0].Movie_id, e.target.checked)
                                        }
                                    />
                                </div>
                            );
                        })}

                        <Form.Check
                            type="switch"
                            id="swedish"
                            label="Sök på svenska filmer"
                            onChange={handleSwitchChange}
                        />
                        <Button variant="primary" onClick={handleCollectInformation}>
                            Spara inställningar
                        </Button>
                    </Form>
                </Col>
            </>
        );

    }

};

export default RecMovieForm