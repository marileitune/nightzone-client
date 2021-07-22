import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { TextField, Checkbox, Button } from '@material-ui/core';

class PasswordInputSignUp extends Component {
    render() {
        return (
            <div>
                <Link to="/"><img src="https://res.cloudinary.com/dplgnsjzm/image/upload/v1626958315/nightzone-backend/images/logo_parfkw.png" width="40%" alt="nightzone logo" /></Link>
                <p>Choose a password with 6-16 characters in length and at least 1 number and 1 special character.</p>
                <TextField id="outlined-basic" label="Password" variant="outlined" />
                <TextField id="outlined-basic" label="Confirm password" variant="outlined" />
                <Button variant="contained" color="primary">SIGN UP</Button>
                <Checkbox/>
            </div>
        )
    }
}

export default PasswordInputSignUp;