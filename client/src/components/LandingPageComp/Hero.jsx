import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

/**
 * @author Oskar dahlberg
 * @Description Temporary hero banner for landingpage, maybe use trailercomponent?
 */
function Hero({ heroData }) {
  return (
    <>
      <Card className=" p-0 mb-4 hero-card">
        <Link to={`/film/${heroData.movie.Movie_id}`}>
          <div className="overlay"></div>
          <Card.Img src={heroData?.movie.Image} alt="Card image" />
        </Link>
      </Card>
    </>
  );
}

export default Hero;
