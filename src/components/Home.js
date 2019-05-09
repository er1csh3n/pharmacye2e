import React from "react";
import PickyDateTime from 'react-picky-date-time';
import {Carousel} from "react-bootstrap";
import '../Home.css';


class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showPickyDateTime: true
        };
    }
    render() {
        const {
            showPickyDateTime
        } = this.state;

        return(
            <div className = "home_bg_image">
            <div className="card_size">
                <br/>
            <PickyDateTime
                size="s"
                mode={1}
                show={showPickyDateTime}
                locale="en-us"
                onClose={() => this.setState({ showPickyDateTime: true })}
            />
            </div>
            <div className="card_size_1">
                <Carousel>
                    <Carousel.Item>
                        <img className="carousel_image"
                            src={require('../images/inventory-carousel.png')}
                            width="100%"
                            height="100%"
                            alt="Inventory"
                        />
                        <Carousel.Caption>
                            <p className="carousel_font">Check and Update Inventory</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="carousel_image"
                            src={require('../images/prescription-carousel.png')}
                            width="100%"
                            height="100%"
                            alt="Prescription"
                        />
                        <Carousel.Caption>
                            <p className="carousel_font">Update Prescription Statuses</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img className="carousel_image"
                            src={require('../images/analytics-carousel.png')}
                            width="100%"
                            height="100%"
                            alt="Analytics"
                        />
                        <Carousel.Caption>
                            <p className="carousel_font_2">Sales Analytics and Forecast</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
            </div>
        );
    }
}
export default Home;
