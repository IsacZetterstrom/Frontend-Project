import React from "react";
import { Card } from "react-bootstrap";

/**
 * @author Niklas Nguyen
 * @description this component is holding the ad for the applikation
 */

function AdCard() {
  return (
    <Card className="ad-card">
      <Card.Body>
        <Card.Title className="text-center">Rabatt</Card.Title>
        <Card.Text className="text-center">25% rabatt på popcorn!</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default AdCard;
