import React from "react";
import { Container, Row , Image } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";






function RecMovies() {
const { loading, err, data } = useFetchData("profile/recommended");
    console.log(data)

}


export default RecMovies