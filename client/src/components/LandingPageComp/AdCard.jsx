import React from "react";
import { Card } from "react-bootstrap";
import { useNavigate, useOutletContext } from "react-router-dom";
import popcorn from "../../assets/popcorn.jpg";

/**
 * @author Niklas Nguyen
 * @description this component is holding the ad for the applikation
 */

function AdCard() {
  const navigate = useNavigate();
  const { isLoggedIn } = useOutletContext();

  const handleCardClick = () => {
    if (isLoggedIn) {
      navigate("/min-sida");
    } else {
      navigate("/registrera");
    }
  };

  return (
    <Card className="ad-card p-0" onClick={handleCardClick}>
      <img className="card-image card-img-top" src={popcorn} alt="reklam" />
      <Card.Body className="card-body p-0">
        <Card.Title className="card-title">
          25% rabatt på popcorn när du är medlem!
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default AdCard;
