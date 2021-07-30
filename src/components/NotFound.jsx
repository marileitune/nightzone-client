import React, { Component } from 'react'
import {Link, withRouter} from  'react-router-dom';
import LottieControl from './LottieControl'
import ErrorJson from '../animations/404.json'
import {Button, Typography} from '@material-ui/core'

class NotFound extends Component {
    render() {
        return (
            <div className="both-centered">
                <LottieControl
                width="50%"
                animation={ErrorJson}/>
                <Typography style={{color: "#DEEEEA", fontSize:"20px"}}>It seems like you loose your way to party. Maybe you only need some rest before going.</Typography>
                <Link to="/" style={{ textDecoration: 'none', color:"#DEEEEA", marginTop: '2%' }}><Button variant="contained" className="CustomButton">GO HOME</Button></Link>
            </div>
        )
    }
}

export default withRouter(NotFound);

