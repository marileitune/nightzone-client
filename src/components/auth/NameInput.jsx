import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';

class NameInput extends Component {
    render() {
        const {onNext, onPreview, onChange} = this.props
        return (
            <div>
                <p>What is your name?</p>
                <TextField id="outlined-basic" label="First name" variant="outlined" type="text" required onChange={onChange('firstName')}/>
                <TextField id="outlined-basic" label="Last name" variant="outlined" type="text" required onChange={onChange('lastName')}/>
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
            </div>
        )
    }
}

export default NameInput;