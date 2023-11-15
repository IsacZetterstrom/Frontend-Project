import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { BsPlayCircleFill } from "react-icons/bs";

/**
 * @author Louise Johansson
 * @description Renders the trailer for the film, takes in movie data from parent.
 */
function TrailerComponent({ movie }) {
  const { Image, Title, Trailer } = movie;
  const videoId = Trailer.split("=")[1];

  const [showVideo, setShowVideo] = useState(false);

  const openVideo = () => {
    setShowVideo(true);
  };

  const closeVideo = () => {
    setShowVideo(false);
  };

  return (
    <Container fluid className="trailer-container">
      <div className="overlay"></div>
      <img src={Image} alt={Title} onClick={openVideo} />
      <BsPlayCircleFill className="play-button play-button-icon" onClick={openVideo} />
      {showVideo && (
        <div className="video-modal" onClick={closeVideo}>
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={Title}
          ></iframe>
        </div>
      )}
    </Container>
  );
}

export default TrailerComponent;
