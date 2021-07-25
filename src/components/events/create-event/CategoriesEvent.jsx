import React, { Component } from 'react'
import { Checkbox, Button, FormControlLabel } from '@material-ui/core';
import {withRouter} from  'react-router-dom';

class CategoriesEvent extends Component {
    render() {
        const {onPreview, onCreate, onCheck, error} = this.props
        return (
            <div>
                <p>How would you describe your party? (max 3 categories)</p>
                <FormControlLabel control={<Checkbox name="categories" required onChange={() => onCheck('houseParty')}/>}label="House party"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={() => onCheck('outdoorParty')}/>}label="Outdoor party"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={() => onCheck('music')}/>}label="Music"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={() => onCheck('karaoke')}/>}label="Karaoke"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={() => onCheck('email')}/>}label="Game party"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={() => onCheck('drinks')}/>}label="Drinks"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={() => onCheck('costumeParty')}/>}label="Costume party"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={() => onCheck('swimmingPool')}/>}label="Swimming pool"/>
                {/* buttons */}
                <Button variant="contained" color="primary" onClick={onPreview}>BACK</Button>
                <Button variant="contained" color="primary" onClick={onCreate}>CREATE</Button>
                {
                    error && <p>{error}</p> 
                }                {
                    error && <p>{error}</p> 
                }
            </div>
        )
    }
}

export default withRouter(CategoriesEvent);