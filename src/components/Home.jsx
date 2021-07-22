import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap';

class Home extends Component {
    render() {
        return (
        <div>
            <Container fluid id="home-container">
                    <div id="video-container">
                        <video id="background-video" autoPlay loop muted>
                            <source src="https://res.cloudinary.com/dplgnsjzm/video/upload/v1626958308/nightzone-backend/video/video_gw4ydm.mp4" type='video/mp4' />
                        </video>
                    </div>
                    <div id="text-container">
                        <h1 id="home-title">JUST ENJOY</h1>
                        <h6 id="home-description">Life is made of moments. Memories. And parties.</h6>
                    </div>
            </Container>
        </div>
        )
    }
}

export default Home;