import { Carousel, Col, Image, Row } from "react-bootstrap";
import useFetchData from "../../hooks/useFetchData";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/**
 *@author Niklas Nguyen
 * @param url is where it fetches from
 * @description this component fetches and group the movie depending the screen size
 */

function MovieCaruosel({ url }) {
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
    const itemsToShow = screen < 576 ? 2 : screen < 768 ? 3 : 4;

    return data.map((movie, index) => {
      if (index % itemsToShow === 0) {
        const itemsInSlide = data.slice(index, index + itemsToShow);
        return (
          <Carousel.Item key={index}>
            <Row className="justify-content-center align-items-center">
              {itemsInSlide.map((movieItem) => (
                <Col xs={4} md={2} key={movieItem.Movie_id}>
                  <Link to={`/film/${movieItem.Movie_id}`}>
                    <Image src={movieItem.Poster} alt="" fluid rounded />
                    <p className="lh-1">{movieItem.Title}</p>
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
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null} indicators={false}>
      {(loading && <p>laddar....</p>) || (err && <p>404 hittade inte filmerna</p>) || renderCarouselItems()}
    </Carousel>
  );
}

export default MovieCaruosel;
