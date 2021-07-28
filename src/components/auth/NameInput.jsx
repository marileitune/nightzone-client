import React, { Component } from 'react'
import {Link} from  'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {CssTextField} from '../../DefaultTheme'

class NameInput extends Component {
    render() {
        const {onNext, onPreview, onChange, error} = this.props
        return (
            <div className="both-centered">
                <Link to="/"><img src="https://res.cloudinary.com/dplgnsjzm/image/upload/v1626958315/nightzone-backend/images/logo_parfkw.png" width="40%" alt="nightzone logo" /></Link>
                <p>What is your name?</p>
                <CssTextField id="outlined-basic" label="First name" variant="outlined" type="text" required onChange={onChange('firstName')} InputLabelProps={{style: {color: '#DEEEEA'}}}/>
                <CssTextField id="outlined-basic" label="Last name" variant="outlined" type="text" required onChange={onChange('lastName')} InputLabelProps={{style: {color: '#DEEEEA'}}}/>
                <Button variant="contained" className="CustomButton" onClick={onPreview}>BACK</Button>
                <Button variant="contained" className="CustomButton" onClick={onNext}>NEXT</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

export default NameInput;