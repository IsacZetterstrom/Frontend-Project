import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

/**
 * @author Niklas Nguyen
 * @param defaults takes is the custom hook for inputfields
 * @description this component can search/sort and filter the age for movies
 */

function SearchFilterSortQuary({ defaults }) {
  return (
    <>
      <Container className="p-0 m-0 search-filter-sort">
        <Row className="search-container">
          <AiOutlineSearch className="icon" />
          <input {...defaults("search", "Sök på film", { required: false })} />
        </Row>
        <Row>
          <Col className="p-0 d-flex gap-3 justify-content-center select-container">
            <select
              {...defaults("sort", "", {
                className: "form-select mt-3 select ",
              })}>
              <option value="">Sortera</option>
              <option value="dateHigh">Datum nya</option>
              <option value="dateLow">Datum äldre</option>
              <option value="ratingHigh">Betyg högt</option>
              <option value="ratingLow">Betyg lågt</option>
            </select>
            <select
              {...defaults("filter", "", {
                className: "form-select mt-3 select",
              })}>
              <option value="">Filtrera</option>
              <option value="7">Från 7år</option>
              <option value="11">Från 11år</option>
              <option value="15">Från 15år</option>
            </select>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SearchFilterSortQuary;
