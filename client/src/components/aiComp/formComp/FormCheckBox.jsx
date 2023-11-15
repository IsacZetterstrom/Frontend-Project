import React from "react";
import { Form } from "react-bootstrap";
/**
 * @author Oskar Dahlberg
 * @description Form component to select movies you liked.
 */
function FormCheckBox({ setSelectedMovies, movie, index }) {
  const handleMovieCheckboxChange = (movieId, checked) => {
    if (checked) {
      setSelectedMovies((prevSelectedMovies) => [...prevSelectedMovies, movieId]);
    } else {
      setSelectedMovies((prevSelectedMovies) =>
        prevSelectedMovies.filter((id) => id !== movieId)
      );
    }
  };

  return (
    <>
      <div className="mb-3">
        <Form.Check
          key={movie[0].Movie_id}
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
    </>
  );
};

export default FormCheckBox