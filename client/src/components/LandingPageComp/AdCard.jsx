import React from "react";
import { Card } from "react-bootstrap";
import popcorn from "../../assets/popcorn.jpg"



/**
 * @author Niklas Nguyen
 * @description this component is holding the ad for the applikation
 */

function AdCard() {
  return (
    <Card className="ad-card p-0">
      <img
        className="card-image card-img-top"
        src={popcorn} alt="reklam" 
      />
      <Card.Body className="card-body p-0">
        <Card.Title className="text-center card-title">
          25% rabatt på popcorn när du är medlem!
        </Card.Title>
      </Card.Body>
    </Card>
  );
}

export default AdCard;
