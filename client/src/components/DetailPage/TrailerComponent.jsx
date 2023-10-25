import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

function TrailerComponent({ movie }) {
    const { Image, Title, Trailer } = movie;
    const videoId = Trailer.split('=')[1];

    const [showVideo, setShowVideo] = useState(false);

    const openVideo = () => {
        setShowVideo(true);
    };

    const closeVideo = () => {
        setShowVideo(false);
    };

    return (
        <Container fluid className="trailer-container">
            <img src={Image} alt={Title} onClick={openVideo} />
            <div className="play-button" onClick={openVideo}>
                <span className="play-button-icon">▶</span>
            </div>
            {showVideo && (
                <div className="video-modal" onClick={closeVideo}>
                    <iframe
                        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        title="Movie Trailer"
                    ></iframe>
                </div>
            )}
        </Container>
    );
}

export default TrailerComponent;
