import Image from 'react-bootstrap/Image';
import { Card } from "react-bootstrap";

function Hero({ data }) {
    const background = {
        color: '#BD9060',
    };


    if (data) {
        return (
            <Card style={background} className=" p-0 mb-4" >
                <Card.Img
                    src={data.Image}
                    alt="Card image"
                />
                <Card.ImgOverlay>
                    <div className="d-flex flex-column align-items-center justify-content-end h-100">
                        <Card.Title >
                            {data.Title}
                        </Card.Title>
                    </div>
                </Card.ImgOverlay>

            </Card>
        )
    }

}

export default Hero