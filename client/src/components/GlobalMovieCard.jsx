import { Col, Image } from "react-bootstrap";
import { Link } from 'react-router-dom';
function GlobalMovieCard(props) {
  return (
    <>
      <Col xs={props.xs} md={props.md} key={props.id}>
  
        <Link to={`/film/${props.id}`}>
          <Image src={`${props.img}`} fluid rounded />
          <p className="lh-1">{props.title} </p>
        </Link>
      </Col>
    </>
  );
}

export default GlobalMovieCard;