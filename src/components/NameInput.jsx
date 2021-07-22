import React, { Component } from 'react'
import { TextField, Button } from '@material-ui/core';

class NameInput extends Component {
    render() {
        return (
            <div>
                <p>What is your name?</p>
                <TextField id="outlined-basic" label="First name" variant="outlined" />
                <TextField id="outlined-basic" label="Last name" variant="outlined" />
                <Button variant="contained" color="primary">NEXT</Button>
            </div>
        )
    }
}

export default NameInput;