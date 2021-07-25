import React, { Component } from 'react'
import { TextField, Checkbox, Button, FormControlLabel } from '@material-ui/core';
import {withRouter} from  'react-router-dom';

class PriceEvent extends Component {
    render() {
        const {onPreview, onNext, onChange, onCheck, error} = this.props
        return (
            <div>
                <FormControlLabel control={<Checkbox name="isPaid" required onChange={onCheck}/>}label="The event is going to be paid."/>
                <p>How much is the ticket?</p>
                <TextField id="outlined-basic" label="ticketsPrice" variant="outlined" type="number" required onChange={onChange('ticketsPrice')}/>
                <p>Which is the party capacity?</p>
                <TextField id="outlined-basic" label="capacity" variant="outlined" type="number" required onChange={onChange('capacity')}/>
                {/* buttons */}
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onNext}>NEXT</Button>
                {
                    error && <p>{error}</p> 
                }
            </div>
        )
    }
}

export default withRouter(PriceEvent);