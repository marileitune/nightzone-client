import React, { Component } from 'react'
import {Link, withRouter} from  'react-router-dom';
import { Button } from '@material-ui/core';
import FacebookButton from './FacebookButton'
import axios from 'axios';
import GoogleButton from './GoogleButton';

class AuthStateZero extends Component {
    render() {
        const {onFacebookResponse, onGoogleResponse, onNext} = this.props
        return (
            <div>
                <Link to="/"><img src="https://res.cloudinary.com/dplgnsjzm/image/upload/v1626958315/nightzone-backend/images/logo_parfkw.png" width="40%" alt="nightzone logo" /></Link>
                <p>Sign in or sign up with</p>
                <Link to="/auth" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary" onClick={onNext}>EMAIL</Button></Link>
                <FacebookButton onFacebookResponse={onFacebookResponse} />
                <GoogleButton onGoogleResponse={onGoogleResponse}/>
            </div>
        )
    }
}

export default AuthStateZero