import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

class NameInput extends Component {
    render() {
        const {onNext, onPreview, onChange, error} = this.props
        return (
            <div>
                <Link to="/"><img src="https://res.cloudinary.com/dplgnsjzm/image/upload/v1626958315/nightzone-backend/images/logo_parfkw.png" width="40%" alt="nightzone logo" /></Link>
                <p>What is your name?</p>
                <TextField id="outlined-basic" label="First name" variant="outlined" type="text" required onChange={onChange('firstName')}/>
                <TextField id="outlined-basic" label="Last name" variant="outlined" type="text" required onChange={onChange('lastName')}/>
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

export default NameInput;