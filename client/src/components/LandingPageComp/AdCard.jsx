import React from "react";
import { Card } from "react-bootstrap";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import popcorn from "../../assets/popcorn.jpg";

/**
 * @author Niklas Nguyen
 * @description this component is holding the ad for the applikation
 */

function AdCard({showButton}) {
  const navigate = useNavigate();
  const { isLoggedIn } = useOutletContext();

  const handleLinkClick = () => {
    if (isLoggedIn) {
      navigate("/min-sida#ad-card");
    } else {
      navigate("/registrera");
    }
  };

  return (
    <Card id="ad-card" className="ad-card p-0">
      <img className="card-image card-img-top" src={popcorn} alt="reklam" />
      <Card.Body className="card-body p-0">
        <Card.Title className="card-title">25% rabatt på popcorn när du är medlem.</Card.Title>
        <Card.Text>Gäller fram till 13/12 2023</Card.Text>
        { showButton ?         
          <Link className="ad-btn" onClick={()=>handleLinkClick()}>{isLoggedIn ? "Ta del av erbjudandet" : "Logga in eller bli medlem"}</Link>
          : <Card.Text>Visa detta för att ta del av erbjudandet</Card.Text>
        }
      </Card.Body>
    </Card>
  );
}

export default AdCard;
