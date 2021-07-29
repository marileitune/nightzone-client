import React, { Component } from 'react'
import { Typography, Checkbox, Button, FormControlLabel , Grid} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import {withRouter} from  'react-router-dom';
import {CssTextField, Subtitle, CustomCheckbox} from '../../../DefaultTheme'

class PriceEvent extends Component {
    render() {
        const {onPreview, onNext, onChange, onCheck, error, isPaid, ticketsPrice, capacity} = this.props
        return (
            <Grid container direction="column" className="both-centered">
                <Grid>
                    <Subtitle variant="h6" color="secondary">Which is the party capacity?</Subtitle>
                </Grid>
                <Grid item >
                    <CssTextField id="outlined-basic" label="capacity" variant="outlined" type="number" required onChange={onChange('capacity')} value={capacity}/>
                </Grid>
             
                    <FormControlLabel control={<CustomCheckbox name="isPaid" required onChange={onCheck} checked={isPaid}/>}label={<Typography variant="h6" style={{color: '#DEEEEA'}}>The event is going to be paid</Typography>}/>
                    { 
                        isPaid && <>
                        <Grid item>
                            <Subtitle variant="h6" color="secondary">How much is the ticket?</Subtitle>
                        </Grid>
                        <Grid item>
                            <CssTextField id="outlined-basic" label="ticketsPrice" variant="outlined" type="number" required onChange={onChange('ticketsPrice')} value={ticketsPrice}/> 
                        </Grid>
                       </>
                    }
               
                {/* buttons */}
                <Grid container justify="center" alignItems="center" >
                    <Button variant="outlined" className="CustomStrokeButton" onClick={onPreview}>BACK</Button>
                    <Button variant="contained" className="CustomButton" onClick={onNext}>NEXT</Button>
            </Grid> 
                {
                    error && <Alert severity="error">{error}</Alert>
                }
            </Grid>
        )
    }
}

export default withRouter(PriceEvent);
