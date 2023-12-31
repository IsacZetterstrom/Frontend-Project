import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { AiOutlineSearch } from "react-icons/ai";

/**
 * @author Niklas Nguyen
 * @param defaults takes is the custom hook for inputfields
 * @description this component can search/sort and filter the age for movies
 */

function SearchFilterSortQuery({ defaults }) {
  return (
    <>
      <Container className="p-0 m-0 search-filter-sort">
        <Row className="search-container px-4">
          <AiOutlineSearch className="icon" />
          <input {...defaults("search", "Sök på filmtitel", { required: false })} />
        </Row>
        <Row className="p-0 d-flex  justify-content-space select-container">
          <Col className="d-flex flex-column flex-lg-row justify-content-start align-items-center p-0 mt-3">
            <label className="text-nowrap">Sortera på:</label>
            <select
              {...defaults("sort", "", {
                className: "form-select text-center text-md-start",
                required: false,
              })}
            >
              <option value="dateHigh">Nyast överst</option>
              <option value="dateLow">Äldst överst</option>
              <option value="ratingHigh">Betyg Högt till Lågt</option>
              <option value="ratingLow">Betyg Lågt till Högt</option>
            </select>
          </Col>
          <Col className="d-flex flex-column flex-lg-row justify-content-end align-items-center p-0 mt-3">
            <label className="text-nowrap">Åldersgräns:</label>
            <select
              {...defaults("filter", "", {
                className: "form-select text-center text-md-start",
                required: false,
              })}
            >
              <option value="">Alla filmer</option>
              <option value="15">15 år</option>
              <option value="11">11 år</option>
              <option value="7">7 år</option>
              <option value="0">Barntillåten</option>
            </select>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default SearchFilterSortQuery;
