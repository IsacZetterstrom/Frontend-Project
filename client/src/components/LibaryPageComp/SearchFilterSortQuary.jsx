import React from "react";
import { Col, Row } from "react-bootstrap";

/**
 * @author Niklas Nguyen
 * @param defaults takes is the custom hook for inputfields
 * @description this component can search/sort and filter the age for movies
 */

function SearchFilterSortQuary({ defaults }) {
  return (
    <>
      <Row className="p-0 m-0 search-filter-sort">
        <input {...defaults("search", "Sök på film", { required: false })} />
        <Col className="p-0 d-flex gap-3 justify-content-center">
          <select {...defaults("sort", "", { className: "form-select mt-3 w-25 " })}>
            <option value="">Sortera</option>
            <option value="dateHigh">Datum nya</option>
            <option value="dateLow">Datum äldre</option>
            <option value="ratingHigh">Betyg högt</option>
            <option value="ratingLow">Betyg lågt</option>
          </select>
          <select {...defaults("filter", "", { className: "form-select mt-3 w-25" })}>
            <option value="">Välj åldersgräns</option>
            <option value="7">7</option>
            <option value="11">11</option>
            <option value="15">15</option>
          </select>
        </Col>
      </Row>
    </>
  );
}

export default SearchFilterSortQuary;
