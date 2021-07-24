import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { TextField, Button } from '@material-ui/core';

class EmailInput extends Component {
    render() {
        const {onChange, onPreview, onNext, error} = this.props
        return (
            <div>
                <Link to="/"><img src="https://res.cloudinary.com/dplgnsjzm/image/upload/v1626958315/nightzone-backend/images/logo_parfkw.png" width="40%" alt="nightzone logo" /></Link>
                <p>What is your email address?</p>
                <TextField id="outlined-basic" label="Email" variant="outlined" type="email" required onChange={onChange('email')}/>
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
                {
                    error && <p>{error}</p> 
                }
            </div>
        )
    }
}

export default EmailInput;