import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';

class EmailInput extends Component {
    render() {
        const {onChange, onPreview, onNext} = this.props
        return (
            <div>
                <p>What is your email address?</p>
                <TextField id="outlined-basic" label="Email" variant="outlined" type="email" required onChange={onChange('email')}/>
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
            </div>
        )
    }
}

export default EmailInput;