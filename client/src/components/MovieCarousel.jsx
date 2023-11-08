import { Carousel, Col, Image, Row } from "react-bootstrap";
import useFetchData from "../hooks/useFetchData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 *@author Niklas Nguyen
 * @param url is where it fetches from
 * @description this component fetches and group the movie depending the screen size
 */

function MovieCarousel({ url, movieId }) {
  const { loading, err, data } = useFetchData(url);
  const [index, setIndex] = useState(0);
  const [screen, setScreen] = useState(window.innerWidth);
  useEffect(() => {
    window.addEventListener("resize", () => {
      setIndex(0);
      setScreen(window.innerWidth);
    });

    return () =>
      window.removeEventListener("resize", () => {
        setIndex(0);
        setScreen(window.innerWidth);
      });
  }, []);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  const renderCarouselItems = () => {
    let movies = data;
    if (movieId !== undefined) movies = data?.filter((movie) => movie.Movie_id !== parseInt(movieId));

    const itemsToShow = screen < 576 ? 2 : screen < 768 ? 2 : 4;

    if (movies.length === 0) {
      return <p className="text-center">Det finns inga liknande filmer just nu.</p>;
    }

    return movies.map((movie, index) => {
      if (index % itemsToShow === 0) {
        const itemsInSlide = movies.slice(index, index + itemsToShow);
        return (
          <Carousel.Item key={index}>
            <Row className="justify-content-center align-items-strech">
              {itemsInSlide.map((movieItem) => (
                <Col xs={4} md={2} key={movieItem.Movie_id}>
                  <Link to={`/film/${movieItem.Movie_id}`} className="img-wrapper">
                    <Image src={movieItem.Poster} alt="" fluid rounded />
                    <p className="">{movieItem.Title}</p>
                  </Link>
                </Col>
              ))}
            </Row>
          </Carousel.Item>
        );
      }
      return null;
    });
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} indicators={false} className="movie-carousel">
      {(loading && <p>laddar....</p>) || (err && <p>404 hittade inte filmerna</p>) || renderCarouselItems()}
    </Carousel>
  );
}

export default MovieCarousel;
