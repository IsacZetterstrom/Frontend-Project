import React from "react";
import { Container, Row, Image, Col, Spinner, useAccordionButton, Accordion, AccordionContext, Button } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import RecMovieCard from "./RecMovieCard";
import CustomToggle from "./CustomToggle";
import RecMovieForm from "./RecMovieForm";
import { useState, useEffect } from "react";
import fetchService from "../../service/FetchService";


function RecMovies() {
   //const { loading, err, data } = useFetchData("profile/recommended");

   //const { loading, err, data } = useFetchData("profile/moviedata");
  const [receivedFormData, setReceivedFormData] = useState([]);
  const[movieData, setMovieData] = useState([])
  const handleReceivedFormData = (formData) => {
    setReceivedFormData(formData);
  };

  useEffect(() => {
    const fetchData = async () => {
        console.log("Runnings fetches")
        try {
          const data = await fetchService.fetchJson('/profile/recommended', 'POST', receivedFormData);
          console.log('Received data:', data);
          setMovieData(data)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
  }, [receivedFormData]);
 

        return (
            <>
                <section>
                    <p> Vi använder Open-AI för att rekommendera filmer åt våra användare.
                        Rekommendationerna är baserade på dina tidigare bokningar.
                    </p>
                    <Accordion defaultActiveKey="1">
                        <CustomToggle eventKey="0">Redigera data</CustomToggle>
                        
                        <Accordion.Collapse eventKey="0">
                            <RecMovieForm sendFormDataToParent={handleReceivedFormData}></RecMovieForm>
                        </Accordion.Collapse>
                    </Accordion>
                </section>
                {
                movieData.length > 0 ? (
                    movieData.map((movie) => (
                    <RecMovieCard key={movie.Title} movie={movie} />
                    ))
                ) : (
                    <p>Inga filmrekommendationer tillgängliga</p>
                )
                }
            </>
        );
    
}

export default RecMovies;