import React, { Component } from 'react'
import {withRouter} from  'react-router-dom';
import { TextField, Button } from '@material-ui/core';

class PlaceEvent extends Component {
    render() {
        const { onPreview, onNext, onChange, error} = this.props
        return (
            <div>
                <p>Where the event is going to happen?</p>
                <TextField id="outlined-basic" label="Address" variant="outlined" type="text" required onChange={onChange('address')}/>
                {/* country */}
                <TextField
                    id="outlined-select-currency-native"
                    select
                    label="Country"
                    // value={country}
                    // onChange={onChange('country')}
                    // SelectProps={{
                    //     native: true,
                    // }}
                    variant="outlined"
                    >
                    {/* {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))} */}
                </TextField>
                {/* city */}
                <TextField
                    id="outlined-select-currency-native"
                    select
                    label="City"
                    // value={city}
                    // onChange={onChange('city')}
                    // SelectProps={{
                    //     native: true,
                    // }}
                    variant="outlined"
                    >
                    {/* {currencies.map((option) => (
                        <option key={option.value} value={option.value}>
                        {option.label}
                        </option>
                    ))} */}
                </TextField>
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

export default withRouter(PlaceEvent);
