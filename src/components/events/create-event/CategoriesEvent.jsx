import React, { Component } from 'react'
import { Checkbox, Button, FormControlLabel } from '@material-ui/core';
import {withRouter} from  'react-router-dom';

class CategoriesEvent extends Component {
    render() {
        const {onPreview, onCreate, onCheck, error} = this.props
        return (
            <div>
                <p>How would you describe your party? (max 3 categories)</p>
                <FormControlLabel control={<Checkbox name="categories" required onChange={onCheck}/>}label="House party"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={onCheck}/>}label="Outdoor party"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={onCheck}/>}label="Music"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={onCheck}/>}label="Karaoke"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={onCheck}/>}label="Game party"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={onCheck}/>}label="Drinks"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={onCheck}/>}label="Costume party"/>
                <FormControlLabel control={<Checkbox name="categories" required onChange={onCheck}/>}label="Swimming pool"/>
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