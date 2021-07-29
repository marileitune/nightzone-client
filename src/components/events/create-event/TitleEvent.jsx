import React, { Component } from 'react'
import {withRouter} from  'react-router-dom';
import { Typography, Button, Grid} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {CssTextField, Subtitle} from '../../../DefaultTheme'

class TitleEvent extends Component {
    render() {
        const {onNext, onChange, error} = this.props
        return (
            <Grid container className="both-centered">
                <Subtitle>What is the name of your event?</Subtitle>
                <CssTextField id="outlined-basic" label="Name" variant="outlined" type="text" required onChange={onChange('name')}/>
                <Button variant="contained" className="CustomButton" onClick={onNext}>NEXT</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </Grid>
        )
    }
}

export default withRouter(TitleEvent);