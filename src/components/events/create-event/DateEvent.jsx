import React, { Component } from 'react'
import { TextField, Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {withRouter} from  'react-router-dom';

class DateEvent extends Component {

    render() {
        const {onNext, onPreview, onChange, error} = this.props
        return (
            <div>
                <p>When the event is going to happen?</p>
                <TextField
                    id="datetime-local"
                    label="Start date and time"
                    type="datetime-local"
                    onChange={onChange('start')}
                />
                <TextField
                    id="datetime-local"
                    label="End date and time"
                    type="datetime-local"
                    onChange={onChange('end')}
                />
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </div>
        )
    }
}

export default withRouter(DateEvent);