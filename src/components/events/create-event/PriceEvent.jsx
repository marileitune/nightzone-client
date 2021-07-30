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
                <Grid item style={{ marginBottom: '2.5%'}}>
                    <Subtitle variant="h6" color="secondary">Which is the party capacity?</Subtitle>
                </Grid>
                <Grid item style={{ marginBottom: '2%'}}>
                    <CssTextField id="outlined-basic" label="Capacity" variant="outlined" type="number" required onChange={onChange('capacity')} value={capacity}/>
                </Grid>
             
                    <FormControlLabel  style={{ marginBottom: '2%'}} control={<CustomCheckbox name="isPaid" required onChange={onCheck} checked={isPaid}/>}label={<Typography variant="h6" style={{color: '#DEEEEA'}}>The event is going to be paid</Typography>}/>
                    { 
                        isPaid && <>
                        <Grid item style={{ marginBottom: '2.5%'}}>
                            <Subtitle variant="h6" color="secondary">How much is the ticket?</Subtitle>
                        </Grid>
                        <Grid item  style={{ marginBottom: '2%'}}>
                            <CssTextField id="outlined-basic" label="ticketsPrice" variant="outlined" type="number" required onChange={onChange('ticketsPrice')} value={ticketsPrice}/> 
                        </Grid>
                       </>
                    }
               
                {/* buttons */}
                <Grid container justify="center" alignItems="center"  style={{ marginBottom: '2%'}}>
                    <Button variant="outlined" className="CustomStrokeButton" onClick={onPreview}  style={{ marginRight: '2%'}}>BACK</Button>
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
