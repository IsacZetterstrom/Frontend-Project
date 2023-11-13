import React from "react";
import {Form,Col } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";

function RecMovieForm(props) {
    const { loading, err, data } = useFetchData("profile/moviedata");
    console.log(data)
 
    if(data){
        return (
            <>
            <Col md={6}>
            <Form>
            <Form.Label>Specifiera tempratur</Form.Label>
              <div className="d-flex justify-content-between align-items-center">
              <p>Mindre random</p>
              <Form.Range className="p-4"/>
              <p>Mycket random</p>
              </div>
              <Form.Label>Välj vilka filmer du vill inkludera</Form.Label>
              {data.map((movie) => {
  console.log(movie[0].Title); // Log the movie information
  return (
    <div key={movie.Movie_id} className="mb-3">
        <p>{movie.Title}</p>
      <Form.Check
        inline
        label={movie[0].Title}
        name="movieCheckboxes"
        type="checkbox"
        id={`inline-${movie.Movie_id}`}
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