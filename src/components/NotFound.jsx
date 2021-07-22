import React, { Component } from 'react'
import LottieControl from './LottieControl'
import ErrorJson from '../animations/404.json'

class NotFound extends Component {
    render() {
        return (
            <div>
                <LottieControl
                width="50%"
                animation={ErrorJson}/>
                <h6 style={{color: "#DEEEEA", fontSize:"20px"}}>It seems like you loose your way to party. Maybe you only need some rest before going.</h6>
            </div>
        )
    }
}

export default NotFound;