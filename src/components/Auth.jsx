import React, { Component } from 'react'
import {Link, withRouter} from  'react-router-dom';
import { TextField } from '@material-ui/core';
import { Button } from '@material-ui/core';
import FacebookButton from './FacebookButton'
import axios from 'axios';

class Auth extends Component {
    render() {
        const {onFacebookResponse} = this.props
        return (
            <div>
                <Link to="/"><img src="https://res.cloudinary.com/dplgnsjzm/image/upload/v1626958315/nightzone-backend/images/logo_parfkw.png" width="40%" alt="nightzone logo" /></Link>
                <p>Sign in or sign up with</p>
                <Link to="/auth" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary">EMAIL</Button></Link>
                <FacebookButton onFacebookResponse={onFacebookResponse}/>
                {/* <form className="" noValidate autoComplete="off">
                    <TextField id="outlined-basic" label="Email" variant="outlined" />
                </form> */}
            </div>
        )
    }
}

export default withRouter(Auth);
