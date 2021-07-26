import React, { Component } from 'react'
import {withRouter} from  'react-router-dom';
import { TextField, Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';

class TitleEvent extends Component {
    render() {
        const {onNext, onChange, error} = this.props
        return (
            <div>
                <p>What is the name of your event?</p>
                <TextField id="outlined-basic" label="Name" variant="outlined" type="text" required onChange={onChange('name')}/>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

export default withRouter(TitleEvent);