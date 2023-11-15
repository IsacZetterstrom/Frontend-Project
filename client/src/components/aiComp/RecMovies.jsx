import React from "react";
import { Accordion, Spinner } from "react-bootstrap";
import RecMovieCard from "./RecMovieCard";
import CustomToggle from "./CustomToggle";
import RecMovieForm from "./RecMovieForm";
import { useState, useEffect } from "react";
import fetchService from "../../service/FetchService";

/**
 * @author Oskar Dahlberg
 * @description Render child components card and form. Using Accordion to hide the form.
 */
function RecMovies() {
    const [receivedFormData, setReceivedFormData] = useState([]);
    const [movieData, setMovieData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const handleReceivedFormData = (formData) => {
        setReceivedFormData(formData);
    };
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                const data = await fetchService.fetchJson('/profile/recommended', 'POST', receivedFormData);
                setMovieData(data)
               
            } catch (error) {

                console.error('Error fetching data:', error);
            }
             setIsLoading(false);
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
                    <CustomToggle eventKey="0">Anpassa dina rekommendationer</CustomToggle>
                    <Accordion.Collapse eventKey="0">
                        <RecMovieForm sendFormDataToParent={handleReceivedFormData}></RecMovieForm>
                    </Accordion.Collapse>
                </Accordion>
            </section>
            {
                isLoading ? (
                    <div className="d-flex flex-column align-items-center">
                    <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </Spinner>
                  </div>
            ) :
                movieData.length > 0 ? (
                    movieData.map((movie) => (
                        <RecMovieCard key={movie.Title} movie={movie} />
                    ))
                ) : (
               <p>Inga filmer att rekommendera.</p>
            
                )
            }
        </>
    );
}



export default RecMovies;