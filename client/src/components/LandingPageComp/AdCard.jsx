import React from "react";
import { Card } from "react-bootstrap";
import Popcorn from "../../assets/Popcorn.svg"



/**
 * @author Niklas Nguyen
 * @description this component is holding the ad for the applikation
 */

function AdCard() {
  return (
    <Card className="ad-card p-0">
        <img
          className="card-image card-img-top"
          src={Popcorn} alt="reklam" 
        />
      <Card.Body className="card-body p-0" style={{ position: "relative" }}>
        <Card.Title className="text-center card-title">
          25% rabatt på popcorn när du är medlem!
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default AdCard;
