import React, { Component } from 'react'
import { Typography, Checkbox, Button, FormControlLabel , Grid} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {withRouter} from  'react-router-dom';
import {CssTextField, Subtitle, CustomCheckbox} from '../../../DefaultTheme'

class PriceEvent extends Component {
    render() {
        const {onPreview, onNext, onChange, onCheck, error, isPaid} = this.props
        console.log(isPaid)
        return (
            <Grid container className="both-centered">
                <FormControlLabel control={<CustomCheckbox name="isPaid" required onChange={onCheck}/>}label={<Typography variant="body1" style={{color: '#DEEEEA'}}>The event is going to be paid</Typography>}/>
                { 
                    isPaid && <><Subtitle>How much is the ticket?</Subtitle> <CssTextField id="outlined-basic" label="ticketsPrice" variant="outlined" type="number" required onChange={onChange('ticketsPrice')}/> </> 
                }
                <Subtitle>Which is the party capacity?</Subtitle>
                <CssTextField id="outlined-basic" label="capacity" variant="outlined" type="number" required onChange={onChange('capacity')}/>
                {/* buttons */}
                <Button variant="contained" className="CustomButton" onClick={onPreview}>BACK</Button>
                <Button variant="contained" className="CustomButton" onClick={onNext}>NEXT</Button>
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </Grid>
        )
    }
}

export default withRouter(PriceEvent);
