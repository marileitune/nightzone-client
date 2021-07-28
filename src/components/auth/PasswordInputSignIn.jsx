import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

class PasswordInputSignIn extends Component {
    render() {
        const {onLogin, onPreview, onChange, error} = this.props
        return (
            <div className="both-centered">
                <Link to="/"><img src="https://res.cloudinary.com/dplgnsjzm/image/upload/v1626958315/nightzone-backend/images/logo_parfkw.png" width="40%" alt="nightzone logo" /></Link>
                <p>What is your password?</p>
                <TextField id="outlined-basic" label="Password" variant="outlined" type="password" required onChange={onChange('password')}/>
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onLogin}>LOG IN</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

export default PasswordInputSignIn;