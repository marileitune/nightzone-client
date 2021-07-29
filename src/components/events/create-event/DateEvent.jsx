import React, { Component } from 'react'
import { Grid, Button} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {withRouter} from  'react-router-dom';
import {CssTextField, Subtitle, CustomDateInput} from '../../../DefaultTheme'
class DateEvent extends Component {

    render() {
        const {onNext, onPreview, onChange, error} = this.props
        return (
            <Grid container className="both-centered">
                <Subtitle color="secondary">When the event is going to happen?</Subtitle>
                <CustomDateInput
                    variant="outlined"
                    id="datetime-local"
                    label="Start date and time"
                    type="datetime-local"
                    value={this.props.start}
                    onChange={onChange('start')}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <CustomDateInput
                    variant="outlined"
                    id="datetime-local"
                    label="End date and time"
                    type="datetime-local"
                    value={this.props.end}
                    onChange={onChange('end')}
                    InputLabelProps={{
                        shrink: true
                    }}
                />
                <Button variant="contained" className="CustomButton" onClick={onPreview}>BACK</Button>
                <Button variant="contained" className="CustomButton"onClick={onNext}>NEXT</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </Grid>
        )
    }
}

export default withRouter(DateEvent);